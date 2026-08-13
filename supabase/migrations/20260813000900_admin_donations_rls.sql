-- Migration: RLS policies for donations

-- Drop existing policies if any
DROP POLICY IF EXISTS "public_can_submit_donation" ON public.donations;
DROP POLICY IF EXISTS "admin_can_select_all_donations" ON public.donations;
DROP POLICY IF EXISTS "admin_can_insert_donations" ON public.donations;
DROP POLICY IF EXISTS "admin_can_update_donations" ON public.donations;
DROP POLICY IF EXISTS "admin_can_delete_donations" ON public.donations;

-- Ensure RLS is enabled
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- 1. Public INSERT policy: anonymous users can submit donation pledge
CREATE POLICY "public_can_submit_donation"
  ON public.donations FOR INSERT
  WITH CHECK (
    status = '신청'
    AND member_id IS NULL
    AND amount > 0
    AND length(trim(donor_name)) > 0
  );

-- 2. Strictly NO Public SELECT policy for donations (anonymous read denied)

-- 3. Admin policies: super_admin and operator (checked via admin_profiles)
CREATE POLICY "admin_can_select_all_donations"
  ON public.donations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator')
  ));

CREATE POLICY "admin_can_insert_donations"
  ON public.donations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator')
  ));

CREATE POLICY "admin_can_update_donations"
  ON public.donations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator')
  ));

CREATE POLICY "admin_can_delete_donations"
  ON public.donations FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator')
  ));
