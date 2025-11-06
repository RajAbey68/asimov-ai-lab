-- Create consultation intake table
CREATE TABLE public.consultation_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Identity
  full_name TEXT NOT NULL,
  organisation TEXT NOT NULL,
  role TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT,
  
  -- Consultation
  session_type TEXT NOT NULL,
  session_objective TEXT NOT NULL,
  ai_category TEXT NOT NULL,
  sector TEXT NOT NULL,
  framework_alignment TEXT[],
  risk_domain TEXT,
  maturity_level TEXT,
  participant_role TEXT,
  meeting_mode TEXT,
  
  -- Optional Info
  use_case_description TEXT,
  datasets_involved TEXT,
  preferred_regulator TEXT,
  expected_outcome TEXT[],
  referral_source TEXT,
  future_interest TEXT[],
  preferred_schedule TEXT,
  
  -- Invoice Details
  invoice_company_name TEXT,
  invoice_vat_number TEXT,
  invoice_billing_contact TEXT,
  
  -- Consent
  data_consent BOOLEAN NOT NULL DEFAULT false,
  non_legal_ack BOOLEAN NOT NULL DEFAULT false,
  
  -- Status tracking
  status TEXT DEFAULT 'pending',
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.consultation_intake ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (insert)
CREATE POLICY "Anyone can submit consultation requests"
  ON public.consultation_intake
  FOR INSERT
  WITH CHECK (true);

-- Admins can view all
CREATE POLICY "Admins can view all consultation intake"
  ON public.consultation_intake
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Admins can update
CREATE POLICY "Admins can update consultation intake"
  ON public.consultation_intake
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Create storage bucket for consultation documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultation-docs', 'consultation-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for consultation documents
CREATE POLICY "Anyone can upload consultation documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'consultation-docs');

CREATE POLICY "Admins can view consultation documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'consultation-docs' AND has_role(auth.uid(), 'admin'));

-- Create table to link documents to consultations
CREATE TABLE public.consultation_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES public.consultation_intake(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size INTEGER,
  content_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.consultation_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage consultation documents"
  ON public.consultation_documents
  FOR ALL
  USING (has_role(auth.uid(), 'admin'));