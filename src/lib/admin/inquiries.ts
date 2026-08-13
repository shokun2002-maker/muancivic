import { createClient } from "@/lib/supabase/client";
import { InquiryDbRow } from "@/types/inquiry";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminInquiries = async (filters?: {
  type?: string;
  status?: string;
  search?: string;
}): Promise<InquiryDbRow[]> => {
  let query = supabase.from("inquiries").select("*");
  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
    );
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as InquiryDbRow[];
};

export const getAdminInquiryById = async (
  id: string
): Promise<InquiryDbRow | null> => {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as InquiryDbRow;
};

export const updateInquiry = async (
  id: string,
  input: Partial<InquiryDbRow>
): Promise<InquiryDbRow> => {
  const { data, error } = await supabase
    .from("inquiries")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("문의 정보 수정 결과를 확인할 수 없습니다.");
  }
  return data as InquiryDbRow;
};

export const deleteInquiry = async (id: string): Promise<void> => {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw error;
};
