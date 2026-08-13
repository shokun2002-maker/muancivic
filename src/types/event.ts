export type EventStatus = "모집예정" | "참여가능" | "상시모집" | "마감";

export interface EventDbRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  start_at: string | null;
  end_at: string | null;
  event_date: string | null; // legacy fallback
  location: string | null;
  status: EventStatus;
  thumbnail_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}
