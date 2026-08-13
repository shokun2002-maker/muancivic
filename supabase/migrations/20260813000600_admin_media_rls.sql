-- Migration: RLS policies for media_albums and media_items

-- Add status column to media_albums (draft | published | hidden)
ALTER TABLE public.media_albums
  ADD COLUMN status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','hidden'));

-- Preserve existing data: set status to 'published' where published_at is not null
UPDATE public.media_albums
  SET status = 'published'
  WHERE published_at IS NOT NULL;

-- Drop existing public SELECT policies if any
DROP POLICY IF EXISTS "Allow public select on media albums" ON public.media_albums;
DROP POLICY IF EXISTS "Allow public select on media items" ON public.media_items;
DROP POLICY IF EXISTS "Allow public select on published media items" ON public.media_items;
DROP POLICY IF EXISTS "Allow public select on published media albums" ON public.media_albums;

-- Create public SELECT policy for media_albums: only rows with status = 'published'
CREATE POLICY "Allow public select on published media albums"
  ON public.media_albums FOR SELECT
  USING (status = 'published');

-- Create public SELECT policy for media_items: only when parent album has status = 'published'
CREATE POLICY "Allow public select on published media items"
  ON public.media_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.media_albums
      WHERE media_albums.id = media_items.album_id
        AND media_albums.status = 'published'
    )
  );

-- Admin policies for media_albums: only super_admin and content_admin
CREATE POLICY "admin_can_select_all_media_albums"
  ON public.media_albums FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_insert_media_albums"
  ON public.media_albums FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_update_media_albums"
  ON public.media_albums FOR UPDATE
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

CREATE POLICY "admin_can_delete_media_albums"
  ON public.media_albums FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

-- Admin policies for media_items: only super_admin and content_admin
CREATE POLICY "admin_can_select_all_media_items"
  ON public.media_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_insert_media_items"
  ON public.media_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));

CREATE POLICY "admin_can_update_media_items"
  ON public.media_items FOR UPDATE
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

CREATE POLICY "admin_can_delete_media_items"
  ON public.media_items FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role IN ('super_admin', 'content_admin')
  ));
