// DB representation of public.member_profiles table
export interface MemberProfileDbRow {
  id: string;
  auth_user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  region: string | null;
  member_type: "정회원" | "준회원" | "후원회원";
  status: "대기" | "승인" | "휴면" | "탈퇴";
  joined_at: string | null;
  created_at: string;
  updated_at: string;
}
