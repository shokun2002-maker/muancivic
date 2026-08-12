import { createClient } from "@/lib/supabase/client";
import { MONITORING_DATA, MonitoringPost } from "@/data/monitoring";

export async function getPublishedMonitoringPosts(): Promise<MonitoringPost[]> {
  try {
    const supabase = createClient();
    if (!supabase) return MONITORING_DATA;

    const { data, error } = await supabase
      .from("monitoring_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[Supabase] getPublishedMonitoringPosts notice:", error.message);
      return MONITORING_DATA;
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      category: item.category,
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "2026.07.24",
      author: "시민연대 모니터링단",
      summary: item.summary,
      targetExamined: item.overview || "",
      currentProgress: item.current_status || "",
      keyIssuePoint: item.key_issue || "",
      alliancePerspective: item.position_text || "",
      proposalText: item.proposal_text || "",
      isSampleDisclaimer: true,
      statusTimeline: [
        { dateStr: "2026.07", text: "모니터링 대상 지정 및 실측 자료 수집" },
      ],
    }));
  } catch (err) {
    console.warn("[Supabase] getPublishedMonitoringPosts fallback executed:", err);
    return MONITORING_DATA;
  }
}
