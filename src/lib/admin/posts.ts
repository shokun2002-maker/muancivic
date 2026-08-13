import { createClient } from "@/lib/supabase/client";
import { Post } from "../../types/post";

// Reuse the shared Supabase browser client that holds auth session
const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

export const getAdminPosts = async (filters?: {
  type?: string;
  status?: string;
  search?: string;
}): Promise<Post[]> => {
  let query = supabase.from("posts").select("*");
  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const getAdminPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }
  return data;
};

export const checkSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
  let query = supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { count, error } = await query;
  if (error) throw error;
  return (count ?? 0) > 0;
};

export const createPost = async (
  post: Omit<Post, "id" | "created_at" | "updated_at">
): Promise<Post> => {
  if (await checkSlugExists(post.slug)) {
    throw new Error("Slug already exists");
  }
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("게시글 저장 결과를 확인할 수 없습니다.");
  }
  return data as Post;
};

export const updatePost = async (
  id: string,
  updates: Partial<Post>
) => {
  if (updates.slug && (await checkSlugExists(updates.slug))) {
    const { data: existing, error } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", updates.slug)
      .single();
    if (error) throw error;
    if (existing?.id !== id) {
      throw new Error("Slug already exists");
    }
  }
  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("게시글 수정 결과를 확인할 수 없습니다.");
  }
  return data as Post;
};

export const deletePost = async (id: string) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
};
