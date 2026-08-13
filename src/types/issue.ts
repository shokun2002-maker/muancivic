// src/types/issue.ts

/**
 * Issue interface matching the `public.issues` table schema.
 */
export interface Issue {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string; // e.g., 'draft', '대응 중', 'published', 'hidden'
  summary: string;
  overview?: string;
  current_situation?: string;
  key_points?: string;
  position_text?: string;
  thumbnail_url?: string;
  published_at: string; // ISO timestamp
  created_at: string;
  updated_at: string;
}
