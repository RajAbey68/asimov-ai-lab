import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, User, Bot, Sparkles, Calendar, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConsultationIntakeDialog from "@/components/ConsultationIntakeDialog";
import LanguageSelector from "@/components/LanguageSelector";
import VoiceRecorder from "@/components/VoiceRecorder";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const HeroChatEmbed = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello, I'm SIMO — Structured Insights for Meaningful Outcomes.\nI aim to provide clear, accurate, and reliable guidance on AI governance and compliance, based on available information and established frameworks. I am continually learning and may occasionally misunderstand or make errors.\nPlease review my responses carefully and consult a qualified human professional whenever needed.\n\nHow can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [language, setLanguage] = useState("en");
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    // Add language context to first message
    const messagesWithLanguage = messages.length === 1 // Only initial greeting
      ? [{ role: "system" as const, content: `User's preferred language: ${language}` }, userMessage]
      : [...messages, userMessage];
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/asimov-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "x-session-id": sessionId,
          },
          body: JSON.stringify({ messages: messagesWithLanguage }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Edge function error:", response.status, errorText);
        
        if (response.status === 429) {
          toast({
            title: "High Demand",
            description: "Our AI assistant is experiencing high demand. Please try again in a moment.",
            variant: "destructive",
          });
          return;
        }
        
        if (response.status === 402) {
          toast({
            title: "Service Unavailable",
            description: "AI service temporarily unavailable. Please contact us directly.",
            variant: "destructive",
          });
          return;
        }
        
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      let streamDone = false;

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent
                };
                return newMessages;
              });
            }
          } catch (e) {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent
                };
                return newMessages;
              });
            }
          } catch { /* ignore */ }
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Hide language selector after first message
    if (showLanguageSelector) {
      setShowLanguageSelector(false);
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
    setIsLoading(false);
  };

  const handleVoiceTranscription = (text: string) => {
    setInput(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Card className="w-full h-[500px] shadow-xl flex flex-col border-2 border-accent/30 bg-card/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-gradient-accent">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold text-accent-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              SIMO
            </CardTitle>
            <p className="text-xs text-accent-foreground/80 mt-1">Structured Insights for Meaningful Outcomes</p>
          </div>
        </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {showLanguageSelector && messages.length === 1 && (
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  Please select your preferred language:
                </p>
                <LanguageSelector value={language} onChange={setLanguage} />
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === "user"
                      ? "bg-primary"
                      : "bg-gradient-accent"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-accent">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background/95 space-y-3">
          <div className="flex gap-2">
            <VoiceRecorder
              onTranscription={handleVoiceTranscription}
              language={language}
              disabled={isLoading}
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about your AI governance needs..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Request Human Callback
          </Button>
        <p className="text-xs text-muted-foreground text-center">
          SIMO — Powered by ASIMOV-AI Expertise
        </p>
        </div>
      </CardContent>
    </Card>
    
    <div className="mt-4 text-center space-y-2">
      <Button
        onClick={() => setDialogOpen(true)}
        size="lg"
        className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Request a Consultation
      </Button>
      <p className="text-sm text-muted-foreground">
        If you don't need immediate contact, use <strong>Stay in Touch</strong> to receive updates on reports and news
      </p>
    </div>

    <ConsultationIntakeDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      chatSessionId={sessionId}
    />
  </>
  );
};

export default HeroChatEmbed;
