import { createClient } from "@/lib/supabase/client";
import { ResourceDbRow } from "@/types/resource";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminResources = async (filters?: {
  category?: string;
  status?: string;
  search?: string;
}): Promise<ResourceDbRow[]> => {
  let query = supabase.from("policy_resources").select("*");
  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%,slug.ilike.%${filters.search}%,source.ilike.%${filters.search}%`
    );
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ResourceDbRow[];
};

export const getAdminResourceById = async (
  id: string
): Promise<ResourceDbRow | null> => {
  const { data, error } = await supabase
    .from("policy_resources")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as ResourceDbRow;
};

export const checkResourceSlugExists = async (
  slug: string,
  excludeId?: string
): Promise<boolean> => {
  let query = supabase
    .from("policy_resources")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { count, error } = await query;
  if (error) throw error;
  return (count ?? 0) > 0;
};

export const createResource = async (
  input: Omit<ResourceDbRow, "id" | "created_at" | "updated_at">
): Promise<ResourceDbRow> => {
  if (await checkResourceSlugExists(input.slug)) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("policy_resources")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("정책자료 저장 결과를 확인할 수 없습니다.");
  }
  return data as ResourceDbRow;
};

export const updateResource = async (
  id: string,
  input: Partial<ResourceDbRow>
): Promise<ResourceDbRow> => {
  if (input.slug && (await checkResourceSlugExists(input.slug, id))) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("policy_resources")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("정책자료 수정 결과를 확인할 수 없습니다.");
  }
  return data as ResourceDbRow;
};

export const deleteResource = async (id: string): Promise<void> => {
  const { error } = await supabase.from("policy_resources").delete().eq("id", id);
  if (error) throw error;
};
