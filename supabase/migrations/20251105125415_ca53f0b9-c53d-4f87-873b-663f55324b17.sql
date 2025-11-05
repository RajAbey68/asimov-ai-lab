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
  USING (public.has_role(auth.uid(), 'admin'));