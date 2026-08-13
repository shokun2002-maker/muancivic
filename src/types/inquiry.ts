// DB representation of public.inquiries table
export interface InquiryDbRow {
  id: string;
  type: string;
  title: string;
  content: string;
  name: string;
  phone: string | null;
  email: string | null;
  status: string; // '접수' | '확인중' | '처리중' | '답변완료'
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
