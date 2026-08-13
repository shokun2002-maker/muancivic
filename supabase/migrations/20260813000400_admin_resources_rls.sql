-- Migration: RLS policies for policy_resources
-- Add status column (draft | published | hidden)
ALTER TABLE public.policy_resources
  ADD COLUMN status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','hidden'));

-- Preserve existing data: set status to 'published' where published_at is not null
UPDATE public.policy_resources
  SET status = 'published'
  WHERE published_at IS NOT NULL;

-- Drop existing public SELECT policy
DROP POLICY IF EXISTS "Allow public select on policy resources" ON public.policy_resources;

-- Create public SELECT policy: only rows with status = 'published'
CREATE POLICY "Allow public select on published policy resources"
  ON public.policy_resources FOR SELECT
  USING (status = 'published');

-- Admin policies: only super_admin and content_admin (checked via admin_profiles)
CREATE POLICY "admin_can_select_all_policy_resources"
  ON public.policy_resources FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_insert_policy_resources"
  ON public.policy_resources FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_update_policy_resources"
  ON public.policy_resources FOR UPDATE
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

CREATE POLICY "admin_can_delete_policy_resources"
  ON public.policy_resources FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));
