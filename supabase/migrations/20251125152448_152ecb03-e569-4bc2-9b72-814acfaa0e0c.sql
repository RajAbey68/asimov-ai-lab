-- Create table for SIMO chat logs
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_message text NOT NULL,
  assistant_response text NOT NULL,
  guardrail_triggered boolean DEFAULT false,
  guardrail_type text,
  redirect_reason text,
  response_time_ms integer,
  model_used text DEFAULT 'google/gemini-2.5-flash',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all logs
CREATE POLICY "Admins can view all chat logs"
ON public.chat_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: System can insert logs (no auth required for edge function logging)
CREATE POLICY "System can insert chat logs"
ON public.chat_logs
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_chat_logs_session_id ON public.chat_logs(session_id);
CREATE INDEX idx_chat_logs_created_at ON public.chat_logs(created_at DESC);
CREATE INDEX idx_chat_logs_guardrail ON public.chat_logs(guardrail_triggered) WHERE guardrail_triggered = true;