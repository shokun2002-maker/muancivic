// DB representation of public.citizen_voices table
export interface VoiceDbRow {
  id: string;
  category: string;
  title: string;
  slug: string;
  content: string;
  author_name: string;
  status: string; // '접수' | '검토 중' | '공론화' | '정책제안' | '답변완료'
  likes_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
