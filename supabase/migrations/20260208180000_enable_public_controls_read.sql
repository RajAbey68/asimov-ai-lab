-- Allow anonymous users to read controls (essential for public assessment)
-- This fixes the issue where questions don't load for guests.

-- Enable RLS just in case (though should be enabled already)
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;

-- Create policy allowing everyone (including guests) to read controls
DROP POLICY IF EXISTS "Public can view controls" ON public.controls;

CREATE POLICY "Public can view controls"
ON public.controls
FOR SELECT
TO anon, authenticated
USING (true);

-- Also ensure 'audit_responses' can be read by the creator?
-- Actually, the public assessment only needs to WRITE responses, not read them back.
-- But it *might* need to read them for calculating score?
-- No, calculation is done locally in React state `answers`.

-- So just controls read access is enough.
