-- supabase/migrations/20260813000200_admin_issue_principles_updates_rls.sql
-- Secure RLS for issue_principles & issue_updates tables

-- 1️⃣ Remove insecure public SELECT policies
DROP POLICY IF EXISTS "Allow public select on issue principles" ON public.issue_principles;
DROP POLICY IF EXISTS "Allow public select on issue updates"   ON public.issue_updates;

-- 2️⃣ Public can read only when parent issue is published
CREATE POLICY "public_can_select_issue_principles"
  ON public.issue_principles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.issues i
      WHERE i.id = issue_principles.issue_id
        AND i.status = 'published'
    )
  );

CREATE POLICY "public_can_select_issue_updates"
  ON public.issue_updates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.issues i
      WHERE i.id = issue_updates.issue_id
        AND i.status = 'published'
    )
  );

-- 3️⃣ Admin SELECT (all rows) for both tables
CREATE POLICY "admin_can_select_all_issue_principles"
  ON public.issue_principles
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "admin_can_select_all_issue_updates"
  ON public.issue_updates
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE auth_user_id = auth.uid()));

-- 4️⃣ Admin CRUD (INSERT/UPDATE/DELETE) for both tables
CREATE POLICY "admin_can_manage_issue_principles"
  ON public.issue_principles
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE auth_user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "admin_can_manage_issue_updates"
  ON public.issue_updates
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE auth_user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_profiles WHERE auth_user_id = auth.uid()));
