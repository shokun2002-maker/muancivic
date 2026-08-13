-- Migration: RLS policies for inquiries

-- Drop existing policies if any
DROP POLICY IF EXISTS "public_can_submit_inquiry" ON public.inquiries;
DROP POLICY IF EXISTS "admin_can_select_all_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "admin_can_insert_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "admin_can_update_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "admin_can_delete_inquiries" ON public.inquiries;

-- Ensure RLS is enabled
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 1. Public INSERT policy: anonymous users can submit inquiries (forced status = '접수', is_public = false)
CREATE POLICY "public_can_submit_inquiry"
  ON public.inquiries FOR INSERT
  WITH CHECK (
    status = '접수'
    AND is_public = false
  );

-- 2. Strictly NO Public SELECT policy for inquiries (anonymous read denied)

-- 3. Admin policies: super_admin, operator, and member_admin (checked via admin_profiles)
CREATE POLICY "admin_can_select_all_inquiries"
  ON public.inquiries FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator', 'member_admin')
  ));

CREATE POLICY "admin_can_insert_inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator', 'member_admin')
  ));

CREATE POLICY "admin_can_update_inquiries"
  ON public.inquiries FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator', 'member_admin')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator', 'member_admin')
  ));

CREATE POLICY "admin_can_delete_inquiries"
  ON public.inquiries FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'operator', 'member_admin')
  ));
