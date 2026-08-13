import { createClient } from "@/lib/supabase/client";
import type { MonitoringDbPost } from "@/types/monitoring";
import type { MonitoringPost } from "@/data/monitoring";

type MonitoringCategory = MonitoringPost["category"];

function normalizeMonitoringCategory(category: string): MonitoringCategory {
  const allowed: MonitoringCategory[] = [
    "무안군정",
    "무안군의회",
    "예산",
    "정책점검",
  ];

  return allowed.includes(category as MonitoringCategory)
    ? (category as MonitoringCategory)
    : "정책점검";
}

/** Map DB row to UI MonitoringPost */
function mapDbToPublic(item: MonitoringDbPost): MonitoringPost {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0].replace(/-/g, ".");
  };
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    date: formatDate(item.published_at),
    author: "",
    targetExamined: item.overview ?? "",
    currentProgress: item.current_status ?? "",
    keyIssuePoint: item.key_issue ?? "",
    alliancePerspective: item.position_text ?? "",
    proposalText: item.proposal_text ?? "",
    statusTimeline: [],
    isSampleDisclaimer: false,
    category: normalizeMonitoringCategory(item.category),
  };
}

/** Fetch all published monitoring posts */
export async function getPublishedMonitoringPosts(): Promise<MonitoringPost[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("monitoring_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.warn("[Supabase] getPublishedMonitoringPosts error:", error.message);
    return [];
  }

  const rows = (data ?? []) as MonitoringDbPost[];
  return rows.map(mapDbToPublic);
}

/** Fetch a single published monitoring post by slug */
export async function getPublishedMonitoringPostBySlug(slug: string): Promise<MonitoringPost | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("monitoring_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.warn("[Supabase] getPublishedMonitoringPostBySlug error:", error.message);
    return null;
  }

  const item = data as MonitoringDbPost;
  return mapDbToPublic(item);
}
