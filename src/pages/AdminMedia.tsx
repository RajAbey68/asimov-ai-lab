import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, Image as ImageIcon, Youtube, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroMedia {
  id: number;
  title: string;
  media_type: string;
  file_path: string;
  is_active: boolean;
  sort_order: number;
}

interface VideoLink {
  id: number;
  title: string;
  description: string;
  youtube_url: string;
  category: string;
  is_active: boolean;
}

const AdminMedia = () => {
  const [heroMedia, setHeroMedia] = useState<HeroMedia[]>([]);
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminRole();
    fetchHeroMedia();
    fetchVideoLinks();
  }, []);

  const checkAdminRole = async () => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user?.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!data) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Admin access required",
      });
      navigate("/");
    }
  };

  const fetchHeroMedia = async () => {
    const { data, error } = await supabase
      .from("hero_media")
      .select("*")
      .order("sort_order");

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading media",
        description: error.message,
      });
    } else {
      setHeroMedia(data || []);
    }
    setLoading(false);
  };

  const fetchVideoLinks = async () => {
    const { data, error } = await supabase
      .from("video_links")
      .select("*")
      .order("category, sort_order");

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading videos",
        description: error.message,
      });
    } else {
      setVideoLinks(data || []);
    }
  };

  const handleHeroMediaUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
      });
      setUploading(false);
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("hero-media")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: uploadError.message,
      });
      setUploading(false);
      return;
    }

    const mediaType = file.type.startsWith("video") ? "video" : "image";

    const { error: dbError } = await supabase.from("hero_media").insert({
      title,
      media_type: mediaType,
      file_path: filePath,
      is_active: false,
      sort_order: heroMedia.length,
    });

    setUploading(false);

    if (dbError) {
      toast({
        variant: "destructive",
        title: "Database error",
        description: dbError.message,
      });
    } else {
      toast({
        title: "Media uploaded",
        description: "Hero media uploaded successfully",
      });
      fetchHeroMedia();
      (e.target as HTMLFormElement).reset();
    }
  };

  const toggleHeroMediaActive = async (id: number, currentStatus: boolean) => {
    // If activating, deactivate all others first
    if (!currentStatus) {
      await supabase.from("hero_media").update({ is_active: false }).neq("id", id);
    }

    const { error } = await supabase
      .from("hero_media")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    } else {
      toast({
        title: currentStatus ? "Media deactivated" : "Media activated",
      });
      fetchHeroMedia();
    }
  };

  const deleteHeroMedia = async (id: number, filePath: string) => {
    if (!confirm("Delete this media? This cannot be undone.")) return;

    await supabase.storage.from("hero-media").remove([filePath]);

    const { error } = await supabase.from("hero_media").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Media deleted",
      });
      fetchHeroMedia();
    }
  };

  const handleVideoLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("video_title") as string;
    const description = formData.get("video_description") as string;
    const youtube_url = formData.get("youtube_url") as string;
    const category = formData.get("category") as string;

    const { error } = await supabase.from("video_links").insert({
      title,
      description,
      youtube_url,
      category,
      is_active: true,
      sort_order: videoLinks.length,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error adding video",
        description: error.message,
      });
    } else {
      toast({
        title: "Video link added",
      });
      fetchVideoLinks();
      (e.target as HTMLFormElement).reset();
    }
  };

  const toggleVideoLinkActive = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("video_links")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    } else {
      fetchVideoLinks();
    }
  };

  const deleteVideoLink = async (id: number) => {
    if (!confirm("Delete this video link?")) return;

    const { error } = await supabase.from("video_links").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Video link deleted",
      });
      fetchVideoLinks();
    }
  };

  const getMediaUrl = (filePath: string) => {
    const { data } = supabase.storage.from("hero-media").getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <div className="container max-w-7xl mx-auto px-4 py-24">
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-2">Media Management</h1>
          <p className="text-muted-foreground">Manage hero videos/images and YouTube links</p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="hero">Hero Media</TabsTrigger>
            <TabsTrigger value="youtube">YouTube Links</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Hero Media
                </CardTitle>
                <CardDescription>
                  Upload videos or images for the homepage hero section (Max 50MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHeroMediaUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Hero background video"
                      required
                      disabled={uploading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">File (Video or Image)</Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp"
                      required
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported: MP4, WebM, MOV, JPG, PNG, WebP
                    </p>
                  </div>

                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload Media"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">Uploaded Hero Media</h2>
              
              {heroMedia.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No hero media uploaded yet
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroMedia.map((media) => (
                    <Card key={media.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {media.media_type === "video" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <ImageIcon className="w-4 h-4" />
                            )}
                            {media.title}
                          </CardTitle>
                          {media.is_active && <Badge>Active</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="aspect-video bg-muted rounded overflow-hidden">
                          {media.media_type === "video" ? (
                            <video
                              src={getMediaUrl(media.file_path)}
                              className="w-full h-full object-cover"
                              muted
                              loop
                            />
                          ) : (
                            <img
                              src={getMediaUrl(media.file_path)}
                              alt={media.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={media.is_active ? "destructive" : "default"}
                            className="flex-1"
                            onClick={() => toggleHeroMediaActive(media.id, media.is_active)}
                          >
                            {media.is_active ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteHeroMedia(media.id, media.file_path)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="youtube" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5" />
                  Add YouTube Video Link
                </CardTitle>
                <CardDescription>
                  Add YouTube videos to display throughout the site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVideoLinkSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video_title">Title</Label>
                    <Input
                      id="video_title"
                      name="video_title"
                      placeholder="AI Governance Tutorial"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_description">Description</Label>
                    <Textarea
                      id="video_description"
                      name="video_description"
                      placeholder="Learn about AI governance best practices..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube_url">YouTube URL</Label>
                    <Input
                      id="youtube_url"
                      name="youtube_url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutorials">Tutorials</SelectItem>
                        <SelectItem value="testimonials">Testimonials</SelectItem>
                        <SelectItem value="case-studies">Case Studies</SelectItem>
                        <SelectItem value="webinars">Webinars</SelectItem>
                        <SelectItem value="explainers">Explainers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit">Add Video Link</Button>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">YouTube Video Links</h2>
              
              {videoLinks.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No YouTube links added yet
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {videoLinks.map((video) => (
                    <Card key={video.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{video.title}</CardTitle>
                              <Badge variant="outline">{video.category}</Badge>
                              {video.is_active && <Badge>Active</Badge>}
                            </div>
                            {video.description && (
                              <CardDescription>{video.description}</CardDescription>
                            )}
                            <p className="text-sm text-muted-foreground mt-2">
                              {video.youtube_url}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={video.is_active ? "outline" : "default"}
                              onClick={() => toggleVideoLinkActive(video.id, video.is_active)}
                            >
                              {video.is_active ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteVideoLink(video.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminMedia;
