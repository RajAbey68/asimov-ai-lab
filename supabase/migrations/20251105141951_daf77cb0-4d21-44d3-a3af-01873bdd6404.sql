-- ===================================================================
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
USING (has_role(auth.uid(), 'admin'::app_role));