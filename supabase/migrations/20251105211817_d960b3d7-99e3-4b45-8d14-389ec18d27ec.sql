-- Create consultation requests table
CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text NOT NULL,
  message text NOT NULL,
  expert_name text NOT NULL,
  contact_method text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a consultation request
CREATE POLICY "Anyone can submit consultation requests"
ON public.consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Admins can view all consultation requests
CREATE POLICY "Admins can view all consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));