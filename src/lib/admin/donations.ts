import { createClient } from "@/lib/supabase/client";
import { DonationDbRow } from "@/types/donation";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminDonations = async (filters?: {
  donationType?: string;
  status?: string;
  search?: string;
}): Promise<DonationDbRow[]> => {
  let query = supabase.from("donations").select("*");
  if (filters?.donationType) query = query.eq("donation_type", filters.donationType);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.ilike("donor_name", `%${filters.search}%`);
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DonationDbRow[];
};

export const getAdminDonationById = async (
  id: string
): Promise<DonationDbRow | null> => {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as DonationDbRow;
};

export const createDonation = async (
  input: Omit<DonationDbRow, "id" | "created_at">
): Promise<DonationDbRow> => {
  const { data, error } = await supabase
    .from("donations")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("후원 내역 등록 결과를 확인할 수 없습니다.");
  }
  return data as DonationDbRow;
};

export const updateDonation = async (
  id: string,
  input: Partial<DonationDbRow>
): Promise<DonationDbRow> => {
  const { data, error } = await supabase
    .from("donations")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("후원 정보 수정 결과를 확인할 수 없습니다.");
  }
  return data as DonationDbRow;
};

export const deleteDonation = async (id: string): Promise<void> => {
  const { error } = await supabase.from("donations").delete().eq("id", id);
  if (error) throw error;
};
