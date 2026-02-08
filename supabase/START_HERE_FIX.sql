-- COMPLETE FIX: Permissions + Data
GRANT SELECT ON public.controls TO anon, authenticated;
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view controls" ON public.controls;
CREATE POLICY "Public can view controls" ON public.controls FOR SELECT TO anon, authenticated USING (true);

TRUNCATE TABLE public.controls RESTART IDENTITY CASCADE;
INSERT INTO public.controls (control_name, category, risk_level, description, evidence, asimov_pillar, sort_order) VALUES
  ('AI System Risk Assessment Documentation', 'Risk Management', 'High Risk', 'Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks, evaluation of risk probability and severity, and mitigation measures throughout the AI system lifecycle per EU AI Act Article 9.', 'Risk assessment reports, impact analysis documents, mitigation plans, risk registers, third-party audit reports', 'A - Accountability', 1),
  ('Conformity Assessment Process', 'Compliance', 'High Risk', 'Establish conformity assessment procedures for high-risk AI systems before market placement, including technical documentation, quality management system, and post-market monitoring plan per EU AI Act Article 43.', 'Conformity certificates, technical documentation, quality management procedures, notified body reports', 'V - Verification', 2),
  ('Data Governance Framework', 'Data Protection', 'High Risk', 'Implement data governance practices ensuring training, validation and testing data sets are relevant, representative, free of errors and complete per EU AI Act Article 10.', 'Data quality reports, governance policies, data lineage documentation, bias assessment reports', 'S - Security', 3),
  ('Human Oversight Measures', 'Governance', 'High Risk', 'Design high-risk AI systems with appropriate human oversight measures including human-in-the-loop, human-on-the-loop, or human-in-command per EU AI Act Article 14.', 'Oversight procedures, escalation protocols, human review logs, intervention mechanisms', 'O - Oversight', 5);
