-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'client', 'viewer');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create sectors table
CREATE TABLE public.sectors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default sectors
INSERT INTO public.sectors (name, description) VALUES
  ('Healthcare', 'Medical devices, diagnostics, treatment AI systems'),
  ('Financial Services', 'Banking, lending, insurance, trading AI systems'),
  ('Government', 'Public sector, regulatory, law enforcement AI'),
  ('Technology', 'Software, platforms, AI development companies'),
  ('Manufacturing', 'Industrial AI, automation, quality control'),
  ('Retail', 'E-commerce, customer service, inventory AI'),
  ('Transportation', 'Autonomous vehicles, logistics, traffic management');

-- Create regions table
CREATE TABLE public.regions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default regions
INSERT INTO public.regions (name, code) VALUES
  ('United Kingdom', 'UK'),
  ('European Union', 'EU'),
  ('United States', 'US'),
  ('Asia Pacific', 'APAC'),
  ('Global', 'GLOBAL');

-- Create controls table (EU AI Act framework)
CREATE TABLE public.controls (
  id SERIAL PRIMARY KEY,
  control_name TEXT NOT NULL,
  category TEXT NOT NULL,
  framework TEXT NOT NULL DEFAULT 'EU AI Act (2023)',
  risk_level TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence TEXT NOT NULL,
  asimov_pillar TEXT,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_controls_framework ON public.controls(framework);
CREATE INDEX idx_controls_category ON public.controls(category);
CREATE INDEX idx_controls_risk_level ON public.controls(risk_level);

-- Insert sample EU AI Act controls (will need to populate all 127)
INSERT INTO public.controls (control_name, category, risk_level, description, evidence, asimov_pillar, sort_order) VALUES
  ('AI System Risk Assessment Documentation', 'Risk Management', 'High Risk', 'Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks, evaluation of risk probability and severity, and mitigation measures throughout the AI system lifecycle per EU AI Act Article 9.', 'Risk assessment reports, impact analysis documents, mitigation plans, risk registers, third-party audit reports', 'A - Accountability', 1),
  ('Conformity Assessment Process', 'Compliance', 'High Risk', 'Establish conformity assessment procedures for high-risk AI systems before market placement, including technical documentation, quality management system, and post-market monitoring plan per EU AI Act Article 43.', 'Conformity certificates, technical documentation, quality management procedures, notified body reports', 'V - Verification', 2),
  ('Data Governance Framework', 'Data Protection', 'High Risk', 'Implement data governance practices ensuring training, validation and testing data sets are relevant, representative, free of errors and complete per EU AI Act Article 10.', 'Data quality reports, governance policies, data lineage documentation, bias assessment reports', 'S - Security', 3),
  ('Transparency and User Information', 'Transparency', 'General Risk', 'Provide clear and adequate information to users about AI system capabilities, limitations, accuracy, and purpose per EU AI Act Article 13.', 'User documentation, disclosure statements, capability descriptions, limitation notices', 'I - Interpretability', 4),
  ('Human Oversight Measures', 'Governance', 'High Risk', 'Design high-risk AI systems with appropriate human oversight measures including human-in-the-loop, human-on-the-loop, or human-in-command per EU AI Act Article 14.', 'Oversight procedures, escalation protocols, human review logs, intervention mechanisms', 'O - Oversight', 5);

-- Create audit_sessions table
CREATE TABLE public.audit_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_name TEXT NOT NULL,
  framework_filter TEXT DEFAULT 'EU AI Act (2023)',
  category_filter TEXT,
  risk_level_filter TEXT,
  sector_id INTEGER REFERENCES public.sectors(id),
  region_id INTEGER REFERENCES public.regions(id),
  status TEXT DEFAULT 'in_progress',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster queries
CREATE INDEX idx_audit_sessions_user_id ON public.audit_sessions(user_id);
CREATE INDEX idx_audit_sessions_status ON public.audit_sessions(status);

-- Enable RLS on audit_sessions
ALTER TABLE public.audit_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for audit_sessions
CREATE POLICY "Users can view their own sessions"
  ON public.audit_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON public.audit_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON public.audit_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions"
  ON public.audit_sessions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create audit_responses table
CREATE TABLE public.audit_responses (
  id SERIAL PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
  control_id INTEGER NOT NULL REFERENCES public.controls(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  response_score INTEGER CHECK (response_score >= 1 AND response_score <= 5),
  evidence TEXT,
  evidence_notes TEXT,
  evidence_date DATE,
  ai_evaluation TEXT,
  ai_quality_score INTEGER CHECK (ai_quality_score >= 1 AND ai_quality_score <= 5),
  ai_confidence_level TEXT,
  evaluation_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, control_id)
);

-- Create index for faster queries
CREATE INDEX idx_audit_responses_session_id ON public.audit_responses(session_id);
CREATE INDEX idx_audit_responses_control_id ON public.audit_responses(control_id);

-- Enable RLS on audit_responses
ALTER TABLE public.audit_responses ENABLE ROW LEVEL SECURITY;

-- RLS policies for audit_responses
CREATE POLICY "Users can view responses for their sessions"
  ON public.audit_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.audit_sessions
      WHERE id = audit_responses.session_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create responses for their sessions"
  ON public.audit_responses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audit_sessions
      WHERE id = audit_responses.session_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update responses for their sessions"
  ON public.audit_responses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.audit_sessions
      WHERE id = audit_responses.session_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all responses"
  ON public.audit_responses FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create evidence_urls table
CREATE TABLE public.evidence_urls (
  id SERIAL PRIMARY KEY,
  response_id INTEGER NOT NULL REFERENCES public.audit_responses(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_evidence_urls_response_id ON public.evidence_urls(response_id);

-- Enable RLS on evidence_urls
ALTER TABLE public.evidence_urls ENABLE ROW LEVEL SECURITY;

-- RLS policies for evidence_urls
CREATE POLICY "Users can manage evidence URLs for their responses"
  ON public.evidence_urls FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.audit_responses ar
      JOIN public.audit_sessions ases ON ar.session_id = ases.id
      WHERE ar.id = evidence_urls.response_id AND ases.user_id = auth.uid()
    )
  );

-- Create evidence_files table
CREATE TABLE public.evidence_files (
  id SERIAL PRIMARY KEY,
  response_id INTEGER NOT NULL REFERENCES public.audit_responses(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  content_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_evidence_files_response_id ON public.evidence_files(response_id);

-- Enable RLS on evidence_files
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for evidence_files
CREATE POLICY "Users can manage evidence files for their responses"
  ON public.evidence_files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.audit_responses ar
      JOIN public.audit_sessions ases ON ar.session_id = ases.id
      WHERE ar.id = evidence_files.response_id AND ases.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_audit_sessions_updated_at
  BEFORE UPDATE ON public.audit_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audit_responses_updated_at
  BEFORE UPDATE ON public.audit_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_controls_updated_at
  BEFORE UPDATE ON public.controls
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Make sectors and regions publicly readable
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sectors are viewable by authenticated users"
  ON public.sectors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Regions are viewable by authenticated users"
  ON public.regions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Controls are viewable by authenticated users"
  ON public.controls FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage controls"
  ON public.controls FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));-- Create storage bucket for hero media
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
  EXECUTE FUNCTION public.update_updated_at_column();-- ASIMOV AI Governance Audit Tool Database Schema

-- Assessment sessions table
CREATE TABLE IF NOT EXISTS assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_name TEXT NOT NULL,
  framework_filter TEXT DEFAULT 'EU AI Act (2023)',
  category_filter TEXT,
  risk_level_filter TEXT,
  sector_id INTEGER REFERENCES sectors(id),
  region_id INTEGER REFERENCES regions(id),
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'archived')),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Governance controls table (251+ controls)
CREATE TABLE IF NOT EXISTS governance_controls (
  id SERIAL PRIMARY KEY,
  control_name TEXT NOT NULL,
  category TEXT NOT NULL,
  framework TEXT NOT NULL DEFAULT 'EU AI Act (2023)',
  asimov_pillar TEXT CHECK (asimov_pillar IN ('Accountability', 'Security', 'Interpretability', 'Monitoring', 'Oversight', 'Verification')),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('High Risk', 'General Risk', 'Low Risk')),
  description TEXT NOT NULL,
  evidence_requirements TEXT NOT NULL,
  regulatory_references TEXT,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Assessment responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id SERIAL PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  control_id INTEGER NOT NULL REFERENCES governance_controls(id),
  response_status TEXT NOT NULL CHECK (response_status IN ('Not Implemented', 'Partially Implemented', 'Largely Implemented', 'Fully Implemented')),
  response_score INTEGER CHECK (response_score BETWEEN 1 AND 5),
  evidence_text TEXT,
  evidence_notes TEXT,
  evidence_date DATE,
  ai_insight TEXT,
  ai_evaluation TEXT,
  ai_quality_score INTEGER CHECK (ai_quality_score BETWEEN 1 AND 5),
  ai_confidence_level TEXT CHECK (ai_confidence_level IN ('High', 'Medium', 'Low')),
  evaluation_status TEXT DEFAULT 'pending' CHECK (evaluation_status IN ('pending', 'evaluated')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(session_id, control_id)
);

-- Evidence URLs table
CREATE TABLE IF NOT EXISTS assessment_evidence_urls (
  id SERIAL PRIMARY KEY,
  response_id INTEGER NOT NULL REFERENCES assessment_responses(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Evidence files table
CREATE TABLE IF NOT EXISTS assessment_evidence_files (
  id SERIAL PRIMARY KEY,
  response_id INTEGER NOT NULL REFERENCES assessment_responses(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  content_type TEXT,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Implementation roadmaps table
CREATE TABLE IF NOT EXISTS implementation_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  owner TEXT,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sprints table
CREATE TABLE IF NOT EXISTS roadmap_sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID NOT NULL REFERENCES implementation_roadmaps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'Planned' CHECK (status IN ('Planned', 'In Progress', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Backlog items table
CREATE TABLE IF NOT EXISTS roadmap_backlog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID NOT NULL REFERENCES implementation_roadmaps(id) ON DELETE CASCADE,
  sprint_id UUID REFERENCES roadmap_sprints(id) ON DELETE SET NULL,
  control_id INTEGER REFERENCES governance_controls(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Backlog' CHECK (status IN ('Backlog', 'In Progress', 'Completed')),
  priority TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  assigned_to TEXT,
  effort_estimate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE governance_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_evidence_urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE implementation_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_backlog_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_sessions
CREATE POLICY "Users can view their own sessions"
  ON assessment_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON assessment_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON assessment_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions"
  ON assessment_sessions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for governance_controls
CREATE POLICY "Controls are viewable by authenticated users"
  ON governance_controls FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage controls"
  ON governance_controls FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for assessment_responses
CREATE POLICY "Users can view responses for their sessions"
  ON assessment_responses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM assessment_sessions
    WHERE assessment_sessions.id = assessment_responses.session_id
    AND assessment_sessions.user_id = auth.uid()
  ));

CREATE POLICY "Users can create responses for their sessions"
  ON assessment_responses FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM assessment_sessions
    WHERE assessment_sessions.id = assessment_responses.session_id
    AND assessment_sessions.user_id = auth.uid()
  ));

CREATE POLICY "Users can update responses for their sessions"
  ON assessment_responses FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM assessment_sessions
    WHERE assessment_sessions.id = assessment_responses.session_id
    AND assessment_sessions.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all responses"
  ON assessment_responses FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for evidence URLs
CREATE POLICY "Users can manage evidence URLs for their responses"
  ON assessment_evidence_urls FOR ALL
  USING (EXISTS (
    SELECT 1 FROM assessment_responses ar
    JOIN assessment_sessions asess ON ar.session_id = asess.id
    WHERE ar.id = assessment_evidence_urls.response_id
    AND asess.user_id = auth.uid()
  ));

-- RLS Policies for evidence files
CREATE POLICY "Users can manage evidence files for their responses"
  ON assessment_evidence_files FOR ALL
  USING (EXISTS (
    SELECT 1 FROM assessment_responses ar
    JOIN assessment_sessions asess ON ar.session_id = asess.id
    WHERE ar.id = assessment_evidence_files.response_id
    AND asess.user_id = auth.uid()
  ));

-- RLS Policies for roadmaps
CREATE POLICY "Users can view their own roadmaps"
  ON implementation_roadmaps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own roadmaps"
  ON implementation_roadmaps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own roadmaps"
  ON implementation_roadmaps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roadmaps"
  ON implementation_roadmaps FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for sprints
CREATE POLICY "Users can manage sprints for their roadmaps"
  ON roadmap_sprints FOR ALL
  USING (EXISTS (
    SELECT 1 FROM implementation_roadmaps
    WHERE implementation_roadmaps.id = roadmap_sprints.roadmap_id
    AND implementation_roadmaps.user_id = auth.uid()
  ));

-- RLS Policies for backlog items
CREATE POLICY "Users can manage backlog items for their roadmaps"
  ON roadmap_backlog_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM implementation_roadmaps
    WHERE implementation_roadmaps.id = roadmap_backlog_items.roadmap_id
    AND implementation_roadmaps.user_id = auth.uid()
  ));

-- Triggers for updated_at
CREATE TRIGGER update_assessment_sessions_updated_at
  BEFORE UPDATE ON assessment_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_governance_controls_updated_at
  BEFORE UPDATE ON governance_controls
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessment_responses_updated_at
  BEFORE UPDATE ON assessment_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_implementation_roadmaps_updated_at
  BEFORE UPDATE ON implementation_roadmaps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roadmap_sprints_updated_at
  BEFORE UPDATE ON roadmap_sprints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roadmap_backlog_items_updated_at
  BEFORE UPDATE ON roadmap_backlog_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_assessment_sessions_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_assessment_sessions_status ON assessment_sessions(status);
CREATE INDEX idx_assessment_responses_session_id ON assessment_responses(session_id);
CREATE INDEX idx_assessment_responses_control_id ON assessment_responses(control_id);
CREATE INDEX idx_governance_controls_framework ON governance_controls(framework);
CREATE INDEX idx_governance_controls_category ON governance_controls(category);
CREATE INDEX idx_governance_controls_risk_level ON governance_controls(risk_level);
CREATE INDEX idx_roadmap_sprints_roadmap_id ON roadmap_sprints(roadmap_id);
CREATE INDEX idx_roadmap_backlog_items_roadmap_id ON roadmap_backlog_items(roadmap_id);-- ===================================================================
--  Asimov-AI | EU AI Act ↔ AICM Crosswalk v6
--  Database Schema for Supabase / PostgreSQL
--  Created: 2025-11-05
-- ===================================================================

CREATE TABLE IF NOT EXISTS ai_controls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    control_id TEXT NOT NULL UNIQUE,
    domain TEXT NOT NULL,
    title TEXT,
    specification TEXT,
    control_type TEXT CHECK (control_type IN ('Preventive', 'Detective', 'Corrective', 'Directive')),
    lifecycle_phase TEXT[],
    role_applicability TEXT[],
    threat_vector TEXT,
    eu_article TEXT,
    eu_annex TEXT,
    mapping_rationale TEXT,
    nist_ref TEXT,
    cobit_ref TEXT,
    iso_ref TEXT,
    validation_scale TEXT CHECK (validation_scale IN ('🔵','🟢','🟡','🔴')),
    evidence_required TEXT,
    last_updated TIMESTAMP DEFAULT now()
);

-- ===================================================================
--  Indexes for fast search and analytics
-- ===================================================================

CREATE INDEX idx_ai_controls_domain ON ai_controls(domain);
CREATE INDEX idx_ai_controls_eu_article ON ai_controls(eu_article);
CREATE INDEX idx_ai_controls_eu_annex ON ai_controls(eu_annex);
CREATE INDEX idx_ai_controls_nist_ref ON ai_controls(nist_ref);
CREATE INDEX idx_ai_controls_cobit_ref ON ai_controls(cobit_ref);
CREATE INDEX idx_ai_controls_iso_ref ON ai_controls(iso_ref);
CREATE INDEX idx_ai_controls_role_applicability ON ai_controls USING GIN (role_applicability);
CREATE INDEX idx_ai_controls_lifecycle_phase ON ai_controls USING GIN (lifecycle_phase);
CREATE INDEX idx_ai_controls_threat_vector ON ai_controls(threat_vector);
CREATE INDEX idx_ai_controls_validation_scale ON ai_controls(validation_scale);

-- ===================================================================
--  Row Level Security Policies
-- ===================================================================

ALTER TABLE ai_controls ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all controls
CREATE POLICY "Controls are viewable by authenticated users" 
ON ai_controls 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Allow admins to manage controls
CREATE POLICY "Admins can manage controls" 
ON ai_controls 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));-- Create consultation requests table
CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text NOT NULL,
  message text NOT NULL,
  expert_name text NOT NULL,
  contact_method text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a consultation request
CREATE POLICY "Anyone can submit consultation requests"
ON public.consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Admins can view all consultation requests
CREATE POLICY "Admins can view all consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));-- Add self-assessment and on-site review options to assessment responses
ALTER TABLE assessment_responses
ADD COLUMN self_assessed BOOLEAN DEFAULT false,
ADD COLUMN onsite_review_requested BOOLEAN DEFAULT false,
ADD COLUMN evidence_access_notes TEXT;-- Create consultation intake table
CREATE TABLE public.consultation_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Identity
  full_name TEXT NOT NULL,
  organisation TEXT NOT NULL,
  role TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT,
  
  -- Consultation
  session_type TEXT NOT NULL,
  session_objective TEXT NOT NULL,
  ai_category TEXT NOT NULL,
  sector TEXT NOT NULL,
  framework_alignment TEXT[],
  risk_domain TEXT,
  maturity_level TEXT,
  participant_role TEXT,
  meeting_mode TEXT,
  
  -- Optional Info
  use_case_description TEXT,
  datasets_involved TEXT,
  preferred_regulator TEXT,
  expected_outcome TEXT[],
  referral_source TEXT,
  future_interest TEXT[],
  preferred_schedule TEXT,
  
  -- Invoice Details
  invoice_company_name TEXT,
  invoice_vat_number TEXT,
  invoice_billing_contact TEXT,
  
  -- Consent
  data_consent BOOLEAN NOT NULL DEFAULT false,
  non_legal_ack BOOLEAN NOT NULL DEFAULT false,
  
  -- Status tracking
  status TEXT DEFAULT 'pending',
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.consultation_intake ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (insert)
CREATE POLICY "Anyone can submit consultation requests"
  ON public.consultation_intake
  FOR INSERT
  WITH CHECK (true);

-- Admins can view all
CREATE POLICY "Admins can view all consultation intake"
  ON public.consultation_intake
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Admins can update
CREATE POLICY "Admins can update consultation intake"
  ON public.consultation_intake
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Create storage bucket for consultation documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultation-docs', 'consultation-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for consultation documents
CREATE POLICY "Anyone can upload consultation documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'consultation-docs');

CREATE POLICY "Admins can view consultation documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'consultation-docs' AND has_role(auth.uid(), 'admin'));

-- Create table to link documents to consultations
CREATE TABLE public.consultation_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES public.consultation_intake(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size INTEGER,
  content_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.consultation_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage consultation documents"
  ON public.consultation_documents
  FOR ALL
  USING (has_role(auth.uid(), 'admin'));-- Create table for SIMO chat logs
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_message text NOT NULL,
  assistant_response text NOT NULL,
  guardrail_triggered boolean DEFAULT false,
  guardrail_type text,
  redirect_reason text,
  response_time_ms integer,
  model_used text DEFAULT 'google/gemini-2.5-flash',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all logs
CREATE POLICY "Admins can view all chat logs"
ON public.chat_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: System can insert logs (no auth required for edge function logging)
CREATE POLICY "System can insert chat logs"
ON public.chat_logs
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_chat_logs_session_id ON public.chat_logs(session_id);
CREATE INDEX idx_chat_logs_created_at ON public.chat_logs(created_at DESC);
CREATE INDEX idx_chat_logs_guardrail ON public.chat_logs(guardrail_triggered) WHERE guardrail_triggered = true;-- Add session tracking to consultation_intake for conversion analysis
ALTER TABLE public.consultation_intake 
ADD COLUMN IF NOT EXISTS chat_session_id text;

-- Create index for faster conversion queries
CREATE INDEX IF NOT EXISTS idx_consultation_chat_session 
ON public.consultation_intake(chat_session_id) 
WHERE chat_session_id IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.consultation_intake.chat_session_id IS 'Links consultation request to SIMO chat session for conversion tracking';-- Allow user_id to be nullable for anonymous sessions
ALTER TABLE public.audit_sessions ALTER COLUMN user_id DROP NOT NULL;

-- Make sure RLS is enabled
ALTER TABLE public.audit_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous (public) users to create sessions
-- Note: 'anon' is the role used for unauthenticated requests
CREATE POLICY "Allow public to create sessions"
ON public.audit_sessions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anonymous (public) users to submit responses
-- We verify the session exists to prevent junk data
CREATE POLICY "Allow public to submit responses"
ON public.audit_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.audit_sessions
    WHERE id = session_id
  )
);

-- Grant usage (if needed, usually handled by Supabase default roles)
GRANT INSERT ON public.audit_sessions TO anon;
GRANT INSERT ON public.audit_responses TO anon;
