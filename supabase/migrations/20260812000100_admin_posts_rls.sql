-- supabase/migrations/20260812000100_admin_posts_rls.sql

-- Allow authenticated admins (admin_profiles) to INSERT, UPDATE, DELETE posts
create policy "admin_can_manage_posts" on public.posts for all
  using (exists (
    select 1 from public.admin_profiles where auth_user_id = auth.uid()
  ));

-- Allow admins to SELECT all posts (including drafts/hidden)
create policy "admin_can_select_all_posts" on public.posts for select
  using (exists (
    select 1 from public.admin_profiles where auth_user_id = auth.uid()
  ));

-- Keep existing public SELECT policy (published only) unchanged
