import { createClient } from "@/lib/supabase/client";
import { AdminProfileDbRow } from "@/types/admin-profile";
import { AdminRole } from "@/lib/permission";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getMyAdminProfile = async (): Promise<AdminProfileDbRow | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data as AdminProfileDbRow | null;
};

export const updateMyDisplayName = async (displayName: string): Promise<AdminProfileDbRow> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("인증된 관리자 정보를 찾을 수 없습니다.");

  const { data, error } = await supabase
    .from("admin_profiles")
    .update({ display_name: displayName.trim() })
    .eq("auth_user_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data as AdminProfileDbRow;
};

export const getAdminProfiles = async (): Promise<AdminProfileDbRow[]> => {
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as AdminProfileDbRow[];
};

export const updateAdminRole = async (
  targetId: string,
  newRole: AdminRole,
  currentAuthUserId: string
): Promise<AdminProfileDbRow> => {
  // Fetch all profiles to validate super_admin constraints
  const { data: allProfiles, error: fetchError } = await supabase
    .from("admin_profiles")
    .select("*");

  if (fetchError) throw fetchError;

  const targetProfile = allProfiles?.find((p) => p.id === targetId);
  if (!targetProfile) {
    throw new Error("대상 관리자 프로필을 찾을 수 없습니다.");
  }

  // Safety Check 1: Self-demotion prevention
  if (targetProfile.auth_user_id === currentAuthUserId && targetProfile.role === AdminRole.super_admin && newRole !== AdminRole.super_admin) {
    throw new Error("자기 자신의 최고 관리자(super_admin) 권한을 직접 해제할 수 없습니다.");
  }

  // Safety Check 2: Minimum 1 super_admin protection
  if (targetProfile.role === AdminRole.super_admin && newRole !== AdminRole.super_admin) {
    const superAdminCount = allProfiles?.filter((p) => p.role === AdminRole.super_admin).length ?? 0;
    if (superAdminCount <= 1) {
      throw new Error("시스템에 최소 1명의 최고 관리자(super_admin)가 존재해야 하므로 강등할 수 없습니다.");
    }
  }

  const { data, error } = await supabase
    .from("admin_profiles")
    .update({ role: newRole })
    .eq("id", targetId)
    .select()
    .single();

  if (error) throw error;
  return data as AdminProfileDbRow;
};

export const updateAdminDisplayName = async (
  targetId: string,
  displayName: string
): Promise<AdminProfileDbRow> => {
  const { data, error } = await supabase
    .from("admin_profiles")
    .update({ display_name: displayName.trim() })
    .eq("id", targetId)
    .select()
    .single();

  if (error) throw error;
  return data as AdminProfileDbRow;
};
