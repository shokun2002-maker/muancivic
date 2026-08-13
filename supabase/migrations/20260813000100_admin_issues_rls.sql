-- supabase/migrations/20260813000100_admin_issues_rls.sql
-- Secure RLS policies for public.issues

-- 1. Remove insecure public SELECT policy
DROP POLICY IF EXISTS "Allow public select on issues"
  ON public.issues;

-- 2. Public can only SELECT rows where status = 'published'
CREATE POLICY "public_can_select_published_issues"
  ON public.issues
  FOR SELECT
  USING (status = 'published');

-- 3. Admin can SELECT all issues (including draft/hidden)
create policy "admin_can_select_all_issues" on public.issues
  for select
  using (exists (
    select 1 from public.admin_profiles where auth_user_id = auth.uid()
  ));

-- 4. Admin can INSERT, UPDATE, DELETE (all) with same admin check
create policy "admin_can_manage_issues" on public.issues
  for all
  using (exists (
    select 1 from public.admin_profiles where auth_user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.admin_profiles where auth_user_id = auth.uid()
  ));
