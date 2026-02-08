CREATE TABLE public.debug_test (id serial primary key, message text);
INSERT INTO public.debug_test (message) VALUES ('Hello World');
ALTER TABLE public.debug_test ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read" ON public.debug_test FOR SELECT TO anon, authenticated USING (true);
GRANT SELECT ON public.debug_test TO anon;
