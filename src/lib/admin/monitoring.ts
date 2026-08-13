import { createClient } from "@/lib/supabase/client";
import { MonitoringDbPost } from "@/types/monitoring";

const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminMonitoringPosts = async (filters?: {
  category?: string;
  status?: string;
  search?: string;
}): Promise<MonitoringDbPost[]> => {
  let query = supabase.from("monitoring_posts").select("*");
  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%,slug.ilike.%${filters.search}%`
    );
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MonitoringDbPost[];
};

export const getAdminMonitoringPostById = async (
  id: string
): Promise<MonitoringDbPost | null> => {
  const { data, error } = await supabase
    .from("monitoring_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as MonitoringDbPost;
};

export const checkMonitoringSlugExists = async (
  slug: string,
  excludeId?: string
): Promise<boolean> => {
  let query = supabase
    .from("monitoring_posts")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { count, error } = await query;
  if (error) throw error;
  return (count ?? 0) > 0;
};

export const createMonitoringPost = async (
  post: Omit<MonitoringDbPost, "id" | "created_at" | "updated_at">
): Promise<MonitoringDbPost> => {
  if (await checkMonitoringSlugExists(post.slug)) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("monitoring_posts")
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("모니터링 저장 결과를 확인할 수 없습니다.");
  }
  return data as MonitoringDbPost;
};

export const updateMonitoringPost = async (
  id: string,
  updates: Partial<MonitoringDbPost>
): Promise<MonitoringDbPost> => {
  if (updates.slug && (await checkMonitoringSlugExists(updates.slug, id))) {
    throw new Error("Slug가 이미 존재합니다.");
  }
  const { data, error } = await supabase
    .from("monitoring_posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("모니터링 수정 결과를 확인할 수 없습니다.");
  }
  return data as MonitoringDbPost;
};

export const deleteMonitoringPost = async (id: string): Promise<void> => {
  const { error } = await supabase.from("monitoring_posts").delete().eq("id", id);
  if (error) throw error;
};
