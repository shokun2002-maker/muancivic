-- Migration: RLS policies, SECURITY DEFINER functions, and triggers for admin_profiles (settings)

-- 1. Helper function: is_super_admin (SECURITY DEFINER to avoid RLS infinite recursion)
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
      AND role = 'super_admin'
  );
$$;

-- Restrict execution permission of is_super_admin to authenticated users only
REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

-- 2. Trigger function: Security check on admin_profiles UPDATE
CREATE OR REPLACE FUNCTION public.check_admin_profile_update_security()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Rule 1: auth_user_id, id, created_at are immutable for ALL users (including super_admin)
  IF (NEW.auth_user_id IS DISTINCT FROM OLD.auth_user_id) THEN
    RAISE EXCEPTION '보안 오류: auth_user_id 바인딩은 변경할 수 없습니다.';
  END IF;

  IF (NEW.id IS DISTINCT FROM OLD.id OR NEW.created_at IS DISTINCT FROM OLD.created_at) THEN
    RAISE EXCEPTION '보안 오류: 식별자(id) 및 생성일시(created_at)는 변경할 수 없습니다.';
  END IF;

  -- Rule 2: Non-super_admin users can ONLY update display_name
  IF NOT public.is_super_admin() THEN
    IF (NEW.role IS DISTINCT FROM OLD.role) THEN
      RAISE EXCEPTION '권한 부족: 관리자 역할(role) 변경은 super_admin만 허용됩니다.';
    END IF;
  END IF;

  -- Rule 3: Prevent self-demotion (super_admin demoting their own role)
  IF (OLD.role = 'super_admin' AND NEW.role <> 'super_admin' AND OLD.auth_user_id = auth.uid()) THEN
    RAISE EXCEPTION '보안 오류: 자기 자신의 super_admin 권한을 직접 강등할 수 없습니다.';
  END IF;

  -- Rule 4: Prevent demoting the last remaining super_admin in the system
  IF (OLD.role = 'super_admin' AND NEW.role <> 'super_admin') THEN
    IF (SELECT count(*) FROM public.admin_profiles WHERE role = 'super_admin') <= 1 THEN
      RAISE EXCEPTION '보안 오류: 시스템에 최소 1명의 super_admin이 유지되어야 합니다.';
    END IF;
  END IF;

  -- Force server-side timestamp for updated_at
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$;

-- Revoke direct execution permission of trigger function from PUBLIC
REVOKE ALL ON FUNCTION public.check_admin_profile_update_security() FROM PUBLIC;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS enforce_admin_profile_update_security ON public.admin_profiles;

CREATE TRIGGER enforce_admin_profile_update_security
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_admin_profile_update_security();

-- 3. Drop existing RLS policies on public.admin_profiles
DROP POLICY IF EXISTS "Allow authenticated user to read own admin profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "admin_can_select_own_profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "admin_can_update_own_display_name" ON public.admin_profiles;
DROP POLICY IF EXISTS "super_admin_can_select_all_admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "super_admin_can_insert_admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "super_admin_can_update_admin_profiles" ON public.admin_profiles;

-- Ensure RLS is enabled
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy 1: Authenticated admins can SELECT their own profile
CREATE POLICY "admin_can_select_own_profile"
  ON public.admin_profiles FOR SELECT
  USING (auth_user_id = auth.uid());

-- 5. RLS Policy 2: Authenticated admins can UPDATE their own profile (display_name only, enforced by trigger)
CREATE POLICY "admin_can_update_own_display_name"
  ON public.admin_profiles FOR UPDATE
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

-- 6. RLS Policy 3: super_admin can SELECT all admin profiles (uses is_super_admin() to prevent recursion)
CREATE POLICY "super_admin_can_select_all_admin_profiles"
  ON public.admin_profiles FOR SELECT
  USING (public.is_super_admin());

-- 7. RLS Policy 4: super_admin can UPDATE all admin profiles
CREATE POLICY "super_admin_can_update_admin_profiles"
  ON public.admin_profiles FOR UPDATE
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- Note: No INSERT policy and no DELETE policy created for admin_profiles in this migration,
-- preventing direct public/authenticated client inserts or deletes of admin accounts.
