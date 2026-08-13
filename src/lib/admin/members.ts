import { createClient } from "@/lib/supabase/client";
import { MemberProfileDbRow } from "@/types/member";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminMembers = async (filters?: {
  memberType?: string;
  status?: string;
  search?: string;
}): Promise<MemberProfileDbRow[]> => {
  let query = supabase.from("member_profiles").select("*");
  if (filters?.memberType) query = query.eq("member_type", filters.memberType);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,region.ilike.%${filters.search}%`
    );
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MemberProfileDbRow[];
};

export const getAdminMemberById = async (
  id: string
): Promise<MemberProfileDbRow | null> => {
  const { data, error } = await supabase
    .from("member_profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as MemberProfileDbRow;
};

export const createMember = async (
  input: Omit<MemberProfileDbRow, "id" | "created_at" | "updated_at">
): Promise<MemberProfileDbRow> => {
  const { data, error } = await supabase
    .from("member_profiles")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("회원 등록 결과를 확인할 수 없습니다.");
  }
  return data as MemberProfileDbRow;
};

export const updateMember = async (
  id: string,
  input: Partial<MemberProfileDbRow>
): Promise<MemberProfileDbRow> => {
  const { data, error } = await supabase
    .from("member_profiles")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("회원 정보 수정 결과를 확인할 수 없습니다.");
  }
  return data as MemberProfileDbRow;
};

export const deleteMember = async (id: string): Promise<void> => {
  const { error } = await supabase.from("member_profiles").delete().eq("id", id);
  if (error) throw error;
};
