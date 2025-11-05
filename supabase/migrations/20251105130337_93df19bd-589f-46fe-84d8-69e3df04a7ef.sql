-- Create storage bucket for hero media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hero-media',
  'hero-media',
  true,
  52428800, -- 50MB limit
  ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- RLS policies for hero-media bucket
CREATE POLICY "Public can view hero media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hero-media');

CREATE POLICY "Admins can upload hero media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'hero-media' 
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update hero media"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'hero-media' 
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete hero media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'hero-media' 
    AND public.has_role(auth.uid(), 'admin')
  );

-- Create hero_media table
CREATE TABLE public.hero_media (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'image')),
  file_path TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for active media queries
CREATE INDEX idx_hero_media_active ON public.hero_media(is_active, sort_order);

-- Enable RLS on hero_media
ALTER TABLE public.hero_media ENABLE ROW LEVEL SECURITY;

-- RLS policies for hero_media
CREATE POLICY "Everyone can view hero media"
  ON public.hero_media FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage hero media"
  ON public.hero_media FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create video_links table for YouTube embeds
CREATE TABLE public.video_links (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for category queries
CREATE INDEX idx_video_links_category ON public.video_links(category, sort_order);

-- Enable RLS on video_links
ALTER TABLE public.video_links ENABLE ROW LEVEL SECURITY;

-- RLS policies for video_links
CREATE POLICY "Everyone can view active video links"
  ON public.video_links FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all video links"
  ON public.video_links FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage video links"
  ON public.video_links FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_hero_media_updated_at
  BEFORE UPDATE ON public.hero_media
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_video_links_updated_at
  BEFORE UPDATE ON public.video_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();