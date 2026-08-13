-- Migration: RLS policies for public.events (시민참여 행사)

-- 1. Drop existing policies on public.events
DROP POLICY IF EXISTS "Allow public select on events" ON public.events;
DROP POLICY IF EXISTS "public_can_select_events" ON public.events;
DROP POLICY IF EXISTS "admin_can_manage_events" ON public.events;

-- Ensure RLS is enabled
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 2. Public Policy: Anonymous & authenticated users can SELECT all events
CREATE POLICY "public_can_select_events"
  ON public.events FOR SELECT
  USING (true);

-- 3. Admin Policy: super_admin & content_admin can INSERT, UPDATE, DELETE events
CREATE POLICY "admin_can_manage_events"
  ON public.events FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_profiles
      WHERE auth_user_id = auth.uid()
        AND role IN ('super_admin', 'content_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.admin_profiles
      WHERE auth_user_id = auth.uid()
        AND role IN ('super_admin', 'content_admin')
    )
  );
