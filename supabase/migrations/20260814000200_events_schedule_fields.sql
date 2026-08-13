-- Migration: Add start_at and end_at schedule fields to public.events

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS start_at TIMESTAMPTZ NULL,
  ADD COLUMN IF NOT EXISTS end_at TIMESTAMPTZ NULL;

-- Backfill start_at from legacy event_date
UPDATE public.events
SET start_at = event_date
WHERE start_at IS NULL
  AND event_date IS NOT NULL;
