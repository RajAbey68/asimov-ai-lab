-- Add session tracking to consultation_intake for conversion analysis
ALTER TABLE public.consultation_intake 
ADD COLUMN IF NOT EXISTS chat_session_id text;

-- Create index for faster conversion queries
CREATE INDEX IF NOT EXISTS idx_consultation_chat_session 
ON public.consultation_intake(chat_session_id) 
WHERE chat_session_id IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.consultation_intake.chat_session_id IS 'Links consultation request to SIMO chat session for conversion tracking';