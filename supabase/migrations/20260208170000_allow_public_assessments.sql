-- Allow user_id to be nullable for anonymous sessions
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
