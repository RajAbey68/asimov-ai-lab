-- ASIMOV AI Governance Audit Tool Database Schema

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
CREATE INDEX idx_roadmap_backlog_items_roadmap_id ON roadmap_backlog_items(roadmap_id);