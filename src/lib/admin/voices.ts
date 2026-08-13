import { createClient } from "@/lib/supabase/client";
import { VoiceDbRow } from "@/types/voice";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminVoices = async (filters?: {
  category?: string;
  status?: string;
  isPublic?: boolean;
  search?: string;
}): Promise<VoiceDbRow[]> => {
  let query = supabase.from("citizen_voices").select("*");
  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.status) query = query.eq("status", filters.status);
  if (typeof filters?.isPublic === "boolean") {
    query = query.eq("is_public", filters.isPublic);
  }
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,slug.ilike.%${filters.search}%,author_name.ilike.%${filters.search}%`
    );
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as VoiceDbRow[];
};

export const getAdminVoiceById = async (
  id: string
): Promise<VoiceDbRow | null> => {
  const { data, error } = await supabase
    .from("citizen_voices")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as VoiceDbRow;
};

export const checkVoiceSlugExists = async (
  slug: string,
  excludeId?: string
): Promise<boolean> => {
  let query = supabase
    .from("citizen_voices")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { count, error } = await query;
  if (error) throw error;
  return (count ?? 0) > 0;
};

export const createVoice = async (
  input: Omit<VoiceDbRow, "id" | "created_at" | "updated_at">
): Promise<VoiceDbRow> => {
  if (await checkVoiceSlugExists(input.slug)) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("citizen_voices")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("시민의 목소리 저장 결과를 확인할 수 없습니다.");
  }
  return data as VoiceDbRow;
};

export const updateVoice = async (
  id: string,
  input: Partial<VoiceDbRow>
): Promise<VoiceDbRow> => {
  if (input.slug && (await checkVoiceSlugExists(input.slug, id))) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("citizen_voices")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("시민의 목소리 수정 결과를 확인할 수 없습니다.");
  }
  return data as VoiceDbRow;
};

export const deleteVoice = async (id: string): Promise<void> => {
  const { error } = await supabase.from("citizen_voices").delete().eq("id", id);
  if (error) throw error;
};
