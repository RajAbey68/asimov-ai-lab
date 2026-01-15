import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  language?: string;
  disabled?: boolean;
}

export default function VoiceRecorder({ onTranscription, language, disabled }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Convert blob to base64
      const reader = new FileReader();
      const base64Audio = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });

      // Send to Whisper API via edge function
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: base64Audio, language }
      });

      if (error) {
        // Check if it's a configuration error
        if (error.message?.includes('API_KEY_NOT_CONFIGURED')) {
          console.log('Voice feature not available - API key not configured');
          setIsAvailable(false);
          return; // Silently disable without showing error toast
        }
        throw error;
      }

      if (data?.text) {
        onTranscription(data.text);
      } else if (data?.error?.code === 'API_KEY_NOT_CONFIGURED') {
        // Service not available
        console.log('Voice feature not available');
        setIsAvailable(false);
        return; // Silently disable
      } else {
        throw new Error('No transcription received');
      }
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Transcription Error",
        description: error instanceof Error ? error.message : "Could not transcribe audio",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Hide button if service is not available
  if (!isAvailable) {
    return null;
  }

  return (
    <Button
      type="button"
      variant={isRecording ? "destructive" : "outline"}
      size="icon"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled || isProcessing}
      title={isRecording ? "Stop recording" : "Start voice recording"}
    >
      {isProcessing ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isRecording ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
