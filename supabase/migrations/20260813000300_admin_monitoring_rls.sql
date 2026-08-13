-- Migration: RLS policies for monitoring_posts
-- Add status column (draft | published | hidden)
ALTER TABLE public.monitoring_posts
  ADD COLUMN status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','hidden'));

-- Preserve existing published data: set status to 'published' where published_at is not null
UPDATE public.monitoring_posts
  SET status = 'published'
  WHERE published_at IS NOT NULL;

-- Drop any existing public SELECT policy
DROP POLICY IF EXISTS "Allow public select on monitoring posts" ON public.monitoring_posts;

-- Create public SELECT policy: only rows with status = 'published'
CREATE POLICY "Allow public select on published monitoring posts"
  ON public.monitoring_posts FOR SELECT
  USING (status = 'published');

-- Admin policies: only super_admin and content_admin (checked via admin_profiles)
CREATE POLICY "admin_can_select_all_monitoring_posts"
  ON public.monitoring_posts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_insert_monitoring_posts"
  ON public.monitoring_posts FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_update_monitoring_posts"
  ON public.monitoring_posts FOR UPDATE
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

CREATE POLICY "admin_can_delete_monitoring_posts"
  ON public.monitoring_posts FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));
