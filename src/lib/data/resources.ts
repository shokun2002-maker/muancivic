import { createClient } from "@/lib/supabase/client";
import type { ResourceDbRow } from "@/types/resource";
import type { PolicyResource, ResourceCategory } from "@/data/resources";

function normalizeResourceCategory(category: string): ResourceCategory {
  const allowed: ResourceCategory[] = [
    "정책자료",
    "토론·포럼",
    "정책질의",
    "조사·분석",
    "공공자료",
    "기타자료",
  ];
  return allowed.includes(category as ResourceCategory)
    ? (category as ResourceCategory)
    : "기타자료";
}

function mapDbToPublic(item: ResourceDbRow): PolicyResource {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0].replace(/-/g, ".");
  };

  return {
    id: item.id,
    slug: item.slug,
    category: normalizeResourceCategory(item.category),
    title: item.title,
    description: item.summary || "",
    date: formatDate(item.published_at || item.created_at),
    source: item.source || "무안 자치주권시민연대",
    fileFormat: "PDF",
    fileSize: "2.5 MB",
    hasFile: !!item.file_url,
    fileUrl: item.file_url || undefined,
    contentBody: item.summary ? [item.summary] : [],
  };
}

/** Fetch all published policy resources from Supabase */
export async function getPublishedResources(): Promise<PolicyResource[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("policy_resources")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.warn("[Supabase] getPublishedResources notice:", error.message);
    return [];
  }

  const rows = (data ?? []) as ResourceDbRow[];
  return rows.map(mapDbToPublic);
}

/** Fetch a single published policy resource by slug from Supabase */
export async function getPublishedResourceBySlug(
  slug: string
): Promise<PolicyResource | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("policy_resources")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.warn("[Supabase] getPublishedResourceBySlug notice:", error.message);
    return null;
  }

  const item = data as ResourceDbRow;
  return mapDbToPublic(item);
}
