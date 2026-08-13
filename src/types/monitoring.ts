
// DB representation of monitoring_posts table
export interface MonitoringDbPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  overview: string | null;
  current_status: string | null;
  key_issue: string | null;
  position_text: string | null;
  proposal_text: string | null;
  status: "draft" | "published" | "hidden";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
