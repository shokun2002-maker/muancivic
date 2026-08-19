// DB representation of public.citizen_voices table
export interface VoiceDbRow {
  id: string;
  category: string;
  title: string;
  slug: string;
  content: string;
  author_name: string;
  status: string; // '접수' | '검토 중' | '처리 중' | '답변 완료'
  likes_count: number;
  is_public: boolean;
  admin_answer?: string | null;
  answered_at?: string | null;
  assigned_department?: string | null;
  created_at: string;
  updated_at: string;
}

