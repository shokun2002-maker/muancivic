-- Migration: Create event_applications table & RLS policies

CREATE TABLE IF NOT EXISTS public.event_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  participant_count INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  privacy_agreed BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for auto updating updated_at
CREATE TRIGGER update_event_applications_updated_at
  BEFORE UPDATE ON public.event_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_event_applications_event ON public.event_applications(event_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.event_applications ENABLE ROW LEVEL SECURITY;

-- 1. Public INSERT policy (allow anyone to register for an event, provided privacy agreement is checked)
CREATE POLICY "public_can_submit_event_application"
  ON public.event_applications FOR INSERT
  WITH CHECK (
    privacy_agreed = true
    AND status = 'received'
  );

-- Note: NO public SELECT policy is created. Public users cannot read applicant personal data.

-- 2. Admin SELECT policy
CREATE POLICY "admin_can_select_event_applications"
  ON public.event_applications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
  ));

-- 3. Admin UPDATE policy
CREATE POLICY "admin_can_update_event_applications"
  ON public.event_applications FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
  ));

-- 4. Admin DELETE policy
CREATE POLICY "admin_can_delete_event_applications"
  ON public.event_applications FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
  ));
