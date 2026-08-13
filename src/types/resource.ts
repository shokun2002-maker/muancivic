// DB representation of public.policy_resources table
export interface ResourceDbRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  source: string;
  file_url: string | null;
  status: "draft" | "published" | "hidden";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
