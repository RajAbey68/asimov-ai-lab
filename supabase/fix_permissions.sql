-- Fix Permissions and seeded data
GRANT SELECT ON public.controls TO anon;
GRANT SELECT ON public.controls TO authenticated;
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view controls" ON public.controls;
CREATE POLICY "Public can view controls" ON public.controls FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.controls (control_name, category, risk_level, description, evidence, asimov_pillar, sort_order) VALUES ('Test Control 1', 'Test', 'High Risk', 'This is a test control to verify database access.', 'None', 'T - Test', 1);
