import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Link as LinkIcon, FileText, X, CheckCircle2, Loader2 } from "lucide-react";

interface EvidenceFile {
  id: number;
  filename: string;
  file_path: string;
  file_size: number;
  content_type: string;
  created_at: string;
}

interface EvidenceUrl {
  id: number;
  url: string;
  created_at: string;
}

interface EvidenceUploadProps {
  responseId: number | null;
  onEvidenceAdded: () => void;
}

export const EvidenceUpload = ({ responseId, onEvidenceAdded }: EvidenceUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [files, setFiles] = useState<EvidenceFile[]>([]);
  const [urls, setUrls] = useState<EvidenceUrl[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !responseId) return;

    const file = event.target.files[0];
    if (!file) return;

    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 20MB",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const filePath = `evidence/${responseId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("evidence-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      const { data, error: dbError } = await supabase
        .from("evidence_files")
        .insert({
          response_id: responseId,
          filename: file.name,
          file_path: filePath,
          file_size: file.size,
          content_type: file.type || "application/octet-stream",
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "Evidence uploaded",
        description: `${file.name} has been uploaded successfully`,
      });

      setFiles([...files, data]);
      onEvidenceAdded();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload evidence",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUrlAdd = async () => {
    if (!urlInput.trim() || !responseId) return;

    try {
      // Validate URL
      new URL(urlInput);

      const { data, error } = await supabase
        .from("evidence_urls")
        .insert({
          response_id: responseId,
          url: urlInput.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "URL added",
        description: "Evidence URL has been saved",
      });

      setUrls([...urls, data]);
      setUrlInput("");
      onEvidenceAdded();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid URL",
      });
    }
  };

  const removeFile = async (fileId: number) => {
    try {
      const file = files.find(f => f.id === fileId);
      if (!file) return;

      // Delete from storage
      await supabase.storage
        .from("evidence-files")
        .remove([file.file_path]);

      // Delete from database
      await supabase
        .from("evidence_files")
        .delete()
        .eq("id", fileId);

      setFiles(files.filter(f => f.id !== fileId));
      toast({
        title: "Evidence removed",
        description: "File has been deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Failed to remove evidence file",
      });
    }
  };

  const removeUrl = async (urlId: number) => {
    try {
      await supabase
        .from("evidence_urls")
        .delete()
        .eq("id", urlId);

      setUrls(urls.filter(u => u.id !== urlId));
      toast({
        title: "URL removed",
        description: "Evidence URL has been deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Failed to remove evidence URL",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="w-5 h-5" />
            Upload Evidence Files
          </CardTitle>
          <CardDescription>
            Upload documents, PDFs, images, or other files (max 20MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                {uploading ? (
                  <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
                ) : (
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                )}
                <p className="text-sm font-medium mb-1">
                  {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, Word, Excel, Images (Max 20MB)
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading || !responseId}
              />
            </Label>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files</Label>
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{file.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.file_size)}
                      </p>
                    </div>
                    <Badge variant="outline">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Uploaded
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 ml-2"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LinkIcon className="w-5 h-5" />
            Add Evidence URLs
          </CardTitle>
          <CardDescription>
            Link to external documentation, policies, or resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/policy-document"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={!responseId}
              onKeyDown={(e) => e.key === "Enter" && handleUrlAdd()}
            />
            <Button onClick={handleUrlAdd} disabled={!responseId || !urlInput.trim()}>
              Add URL
            </Button>
          </div>

          {/* URL List */}
          {urls.length > 0 && (
            <div className="space-y-2">
              <Label>Added URLs</Label>
              {urls.map((urlItem) => (
                <div
                  key={urlItem.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={urlItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline truncate"
                    >
                      {urlItem.url}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 ml-2"
                    onClick={() => removeUrl(urlItem.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5" />
            Additional Notes
          </CardTitle>
          <CardDescription>
            Add contextual information about your evidence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe the evidence, its relevance, and any important context..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            rows={4}
            disabled={!responseId}
          />
        </CardContent>
      </Card>
    </div>
  );
};
