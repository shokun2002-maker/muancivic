-- Migration: Add official answer fields to citizen_voices

ALTER TABLE public.citizen_voices
  ADD COLUMN IF NOT EXISTS admin_answer TEXT,
  ADD COLUMN IF NOT EXISTS answered_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS assigned_department TEXT;

-- Index for searching answered voices if needed
CREATE INDEX IF NOT EXISTS idx_voices_answered_at ON public.citizen_voices(answered_at DESC);
