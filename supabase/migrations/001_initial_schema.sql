-- ============================================================
-- 001_initial_schema.sql
-- ASIMOV AI — Sprint 0 database bootstrap
-- ============================================================

-- pgvector extension (required for future AI embedding features)
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- leads
-- Captures board/executive contacts who express interest.
-- ============================================================
CREATE TABLE leads (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email        text        NOT NULL,
  job_title    text,
  organisation text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- bookings
-- Records diagnostic session bookings linked to a lead.
-- ============================================================
CREATE TABLE bookings (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id          uuid        NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  diagnostic_type  text,
  booked_at        timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Row-Level Security
-- All access is denied by default.
-- The service-role key bypasses RLS and is the only permitted
-- write path (via Edge Functions). No client-side writes allowed.
-- ============================================================
ALTER TABLE leads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Deny all access to anon and authenticated roles.
-- Service role bypasses these policies automatically.
CREATE POLICY "service role only" ON leads
  FOR ALL
  USING (false);

CREATE POLICY "service role only" ON bookings
  FOR ALL
  USING (false);
