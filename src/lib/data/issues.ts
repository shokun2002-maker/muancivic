import { createClient } from "@/lib/supabase/client";
import { IssueArticle } from "@/data/issues";

export async function getPublishedIssues(): Promise<IssueArticle[]> {
  try {
    const supabase = createClient();
    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("issues")
      .select(`
        *,
        issue_principles (*),
        issue_updates (*)
      `)
      .eq("visibility", "published")
      .order("created_at", { ascending: false });

    if (error || !data) {
      if (error) console.warn("[Supabase] getPublishedIssues error:", error.message);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      status: item.status,
      statusBadgeColor: "bg-emerald-50 text-[#176B52] border-[#176B52]/30",
      summary: item.summary,
      coverImage: item.thumbnail_url || "/images/placeholders/issue-default.svg",
      overview: item.overview ? [item.overview] : [],
      currentStatus: item.current_situation ? [item.current_situation] : [],
      keyPoints: item.key_points ? item.key_points.split("\n") : [],
      alliancePosition: item.position_text ? [item.position_text] : [],
      corePrinciples: item.issue_principles
        ? item.issue_principles.map((p: any) => p.content)
        : [],
      timeline: item.issue_updates
        ? item.issue_updates.map((u: any) => ({
            dateStr: u.event_date,
            content: u.title,
          }))
        : [],
    }));
  } catch (err) {
    console.warn("[Supabase] getPublishedIssues error:", err);
    return [];
  }
}

export async function getIssueBySlug(slug: string): Promise<IssueArticle | null> {
  try {
    const issues = await getPublishedIssues();
    const found = issues.find((i) => i.slug === slug);
    return found || null;
  } catch {
    return null;
  }
}
