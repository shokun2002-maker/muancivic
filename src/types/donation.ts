// DB representation of public.donations table
export interface DonationDbRow {
  id: string;
  member_id: string | null;
  donor_name: string;
  donation_type: "정기후원" | "일시후원";
  amount: number;
  donated_at: string | null;
  status: string; // '신청' | '완료' | '취소'
  created_at: string;
}
