import { createClient } from "@/lib/supabase/client";
import { ACTIVITIES_DATA, ActivityPost } from "@/data/activities";

export async function getLatestActivities(): Promise<ActivityPost[]> {
  try {
    const supabase = createClient();
    if (!supabase) {
      return ACTIVITIES_DATA;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", "activity")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[Supabase] getLatestActivities notice:", error.message);
      return ACTIVITIES_DATA;
    }

    return data.map((item: any, idx: number) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "2026.07.24",
      category: item.category || "활동소식",
      summary: item.summary || "",
      coverImage: item.thumbnail_url || "/inaugural_assembly.jpg",
      content: item.content ? item.content.split("\n\n") : [],
      isFeatured: idx === 0,
    }));
  } catch (err) {
    console.warn("[Supabase] getLatestActivities fallback executed:", err);
    return ACTIVITIES_DATA;
  }
}

export async function getActivityBySlug(slug: string): Promise<ActivityPost | null> {
  try {
    const list = await getLatestActivities();
    const found = list.find((a) => a.slug === slug);
    if (found) return found;

    return ACTIVITIES_DATA.find((a) => a.slug === slug) || null;
  } catch {
    return ACTIVITIES_DATA.find((a) => a.slug === slug) || null;
  }
}
