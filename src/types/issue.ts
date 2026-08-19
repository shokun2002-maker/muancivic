// src/types/issue.ts

/**
 * Issue interface matching the `public.issues` table schema.
 */
export interface Issue {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string; // 진행 상태: '대응 중' | '모니터링' | '해결' | '종료'
  visibility: string; // 공개 여부: 'draft' | 'published'
  summary: string;
  overview?: string;
  current_situation?: string;
  key_points?: string;
  position_text?: string;
  thumbnail_url?: string | null;
  published_at: string; // ISO timestamp
  created_at: string;
  updated_at: string;
}
