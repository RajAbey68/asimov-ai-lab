CREATE TABLE public.no_rls_table (id serial primary key, textcol text);
INSERT INTO public.no_rls_table (textcol) VALUES ('I AM VISIBLE');
GRANT ALL ON public.no_rls_table TO anon;
GRANT ALL ON public.no_rls_table TO authenticated;
