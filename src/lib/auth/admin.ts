import { createClient } from "@/lib/supabase/client";

export type AdminRole = "super_admin" | "content_admin" | "member_admin" | "operator";

export interface AdminProfile {
  id: string;
  auth_user_id: string;
  role: AdminRole;
  display_name: string;
  created_at: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  profile: AdminProfile;
}

/**
 * Fetch admin profile for a specific auth user UUID from public.admin_profiles
 */
export async function getAdminProfileByUserId(userId: string): Promise<AdminProfile | null> {
  try {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("auth_user_id", userId)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("[AdminAuth] getAdminProfileByUserId error:", error.message);
      return null;
    }

    return data as AdminProfile;
  } catch (err) {
    console.error("[AdminAuth] getAdminProfileByUserId exception:", err);
    return null;
  }
}

/**
 * Role checking helper
 */
export function hasAdminRole(userRole: AdminRole, allowedRoles: AdminRole[]): boolean {
  if (userRole === "super_admin") return true;
  return allowedRoles.includes(userRole);
}

/**
 * Format Korean role label
 */
export function getRoleLabel(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "최고 관리자";
    case "content_admin":
      return "콘텐츠 관리자";
    case "member_admin":
      return "회원 관리자";
    case "operator":
      return "운영진";
    default:
      return "관리자";
  }
}
