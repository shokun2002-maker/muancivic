-- Migration: RLS policies for member_profiles

-- Drop existing policies if any
DROP POLICY IF EXISTS "public_can_submit_membership_application" ON public.member_profiles;
DROP POLICY IF EXISTS "admin_can_select_all_member_profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "admin_can_insert_member_profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "admin_can_update_member_profiles" ON public.member_profiles;
DROP POLICY IF EXISTS "admin_can_delete_member_profiles" ON public.member_profiles;

-- Ensure RLS is enabled
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

-- 1. Public INSERT policy: anonymous users can submit membership application
-- (status must be '대기', auth_user_id must be NULL, joined_at must be NULL)
CREATE POLICY "public_can_submit_membership_application"
  ON public.member_profiles FOR INSERT
  WITH CHECK (
    status = '대기'
    AND auth_user_id IS NULL
    AND joined_at IS NULL
  );

-- 2. Strictly NO Public SELECT policy for member_profiles (anonymous read denied)

-- 3. Admin policies: super_admin and member_admin (checked via admin_profiles)
CREATE POLICY "admin_can_select_all_member_profiles"
  ON public.member_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'member_admin')
  ));

CREATE POLICY "admin_can_insert_member_profiles"
  ON public.member_profiles FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'member_admin')
  ));

CREATE POLICY "admin_can_update_member_profiles"
  ON public.member_profiles FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'member_admin')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'member_admin')
  ));

CREATE POLICY "admin_can_delete_member_profiles"
  ON public.member_profiles FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'member_admin')
  ));
