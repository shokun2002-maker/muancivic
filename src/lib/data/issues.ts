import { createClient } from "@/lib/supabase/client";
import { ISSUES_DATA, IssueArticle } from "@/data/issues";

export async function getPublishedIssues(): Promise<IssueArticle[]> {
  try {
    const supabase = createClient();
    if (!supabase) {
      return ISSUES_DATA;
    }

    const { data, error } = await supabase
      .from("issues")
      .select(`
        *,
        issue_principles (*),
        issue_updates (*)
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[Supabase] getPublishedIssues query notice:", error.message);
      return ISSUES_DATA;
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      status: item.status,
      statusBadgeColor: "bg-emerald-50 text-[#176B52] border-[#176B52]/30",
      summary: item.summary,
      coverImage: item.thumbnail_url || "/inaugural_assembly.jpg",
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
    console.warn("[Supabase] getPublishedIssues fallback executed:", err);
    return ISSUES_DATA;
  }
}

export async function getIssueBySlug(slug: string): Promise<IssueArticle | null> {
  try {
    const issues = await getPublishedIssues();
    const found = issues.find((i) => i.slug === slug);
    if (found) return found;

    return ISSUES_DATA.find((i) => i.slug === slug) || null;
  } catch {
    return ISSUES_DATA.find((i) => i.slug === slug) || null;
  }
}
