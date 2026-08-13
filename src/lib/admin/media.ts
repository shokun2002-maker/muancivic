import { createClient } from "@/lib/supabase/client";
import { MediaAlbumDbRow } from "@/types/media";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminMedia = async (filters?: {
  type?: string;
  status?: string;
  search?: string;
}): Promise<MediaAlbumDbRow[]> => {
  let query = supabase.from("media_albums").select("*");
  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,slug.ilike.%${filters.search}%`
    );
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MediaAlbumDbRow[];
};

export const getAdminMediaById = async (
  id: string
): Promise<MediaAlbumDbRow | null> => {
  const { data, error } = await supabase
    .from("media_albums")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as MediaAlbumDbRow;
};

export const checkMediaSlugExists = async (
  slug: string,
  excludeId?: string
): Promise<boolean> => {
  let query = supabase
    .from("media_albums")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { count, error } = await query;
  if (error) throw error;
  return (count ?? 0) > 0;
};

export const createMedia = async (
  input: Omit<MediaAlbumDbRow, "id" | "created_at" | "updated_at">
): Promise<MediaAlbumDbRow> => {
  if (await checkMediaSlugExists(input.slug)) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("media_albums")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("미디어 저장 결과를 확인할 수 없습니다.");
  }
  return data as MediaAlbumDbRow;
};

export const updateMedia = async (
  id: string,
  input: Partial<MediaAlbumDbRow>
): Promise<MediaAlbumDbRow> => {
  if (input.slug && (await checkMediaSlugExists(input.slug, id))) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("media_albums")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("미디어 수정 결과를 확인할 수 없습니다.");
  }
  return data as MediaAlbumDbRow;
};

export const deleteMedia = async (id: string): Promise<void> => {
  const { error } = await supabase.from("media_albums").delete().eq("id", id);
  if (error) throw error;
};
