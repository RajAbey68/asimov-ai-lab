-- Add self-assessment and on-site review options to assessment responses
ALTER TABLE assessment_responses
ADD COLUMN self_assessed BOOLEAN DEFAULT false,
ADD COLUMN onsite_review_requested BOOLEAN DEFAULT false,
ADD COLUMN evidence_access_notes TEXT;