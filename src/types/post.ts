export type PostType = "activity" | "notice" | "statement";
export type PostStatus = "draft" | "published" | "hidden";

export interface Post {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string | null;
  thumbnail_url: string | null;
  status: PostStatus;
  published_at: string | null; // ISO string
  created_at: string;
  updated_at: string;
}
