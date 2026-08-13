// src/lib/admin/issues.ts

import { createClient } from "@/lib/supabase/client";
import { Issue } from "@/types/issue";
import { generateSlug } from "@/lib/slug";

// Shared Supabase client (browser)
const supabase = createClient();
if (!supabase) {
  throw new Error("Supabase client not initialized");
}

/** Check if a slug already exists in the issues table */
export const checkIssueSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
  let query = supabase
    .from("issues")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { count, error } = await query;
  if (error) throw error;
  return (count ?? 0) > 0;
};

/** Fetch all issues for admin */
export const getAdminIssues = async (): Promise<Issue[]> => {
  const { data, error } = await supabase.from("issues").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

/** Fetch a single issue by its UUID */
export const getAdminIssueById = async (id: string): Promise<Issue | null> => {
  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }
  return data as Issue;
};

/** Create a new issue */
export const createIssue = async (input: Omit<Issue, "id" | "created_at" | "updated_at">): Promise<Issue> => {
  // Generate slug if not provided
  const slug = input.slug?.trim() ? input.slug.trim() : generateSlug(input.title);
  if (await checkIssueSlugExists(slug)) {
    throw new Error("Slug already exists");
  }
  const payload = { ...input, slug };
  const { data, error } = await supabase.from("issues").insert(payload).select().single();
  if (error) throw error;
  return data as Issue;
};

/** Update an existing issue */
export const updateIssue = async (id: string, updates: Partial<Issue>): Promise<Issue> => {
  if (updates.slug && (await checkIssueSlugExists(updates.slug, id))) {
    throw new Error("Slug already exists");
  }
  const { data, error } = await supabase.from("issues").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as Issue;
};

/** Delete an issue */
export const deleteIssue = async (id: string): Promise<void> => {
  const { error } = await supabase.from("issues").delete().eq("id", id);
  if (error) throw error;
};
