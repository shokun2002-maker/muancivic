-- ========================================================
-- Migration: 20260812000001_admin_profiles_rls.sql
-- Description: Allow authenticated users to read their own admin_profiles row
-- ========================================================

CREATE POLICY "Allow authenticated user to read own admin profile"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);
