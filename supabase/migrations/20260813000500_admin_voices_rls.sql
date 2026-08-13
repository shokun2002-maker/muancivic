-- Migration: RLS policies for citizen_voices

-- Drop existing public policies if any
DROP POLICY IF EXISTS "Allow public select on public citizen voices" ON public.citizen_voices;
DROP POLICY IF EXISTS "Allow public select on citizen voices" ON public.citizen_voices;
DROP POLICY IF EXISTS "public_can_submit_citizen_voice" ON public.citizen_voices;

-- Create public SELECT policy: only rows with is_public = true
CREATE POLICY "Allow public select on published citizen voices"
  ON public.citizen_voices FOR SELECT
  USING (is_public = true);

-- Create public INSERT policy: public users can submit proposals (must be status='접수', likes_count=0, is_public=false)
CREATE POLICY "public_can_submit_citizen_voice"
  ON public.citizen_voices FOR INSERT
  WITH CHECK (
    status = '접수'
    AND likes_count = 0
    AND is_public = false
  );

-- Admin policies: only super_admin and content_admin (checked via admin_profiles)
CREATE POLICY "admin_can_select_all_citizen_voices"
  ON public.citizen_voices FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_insert_citizen_voices"
  ON public.citizen_voices FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_update_citizen_voices"
  ON public.citizen_voices FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_delete_citizen_voices"
  ON public.citizen_voices FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));
