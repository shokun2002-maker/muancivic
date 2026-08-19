export interface EventApplicationDbRow {
  id: string;
  event_id: string;
  applicant_name: string;
  phone: string;
  email?: string | null;
  participant_count: number;
  message?: string | null;
  privacy_agreed: boolean;
  status: "received" | "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
  event_title?: string; // Joined for admin view convenience
}

export type EventApplicationInput = Omit<
  EventApplicationDbRow,
  "id" | "created_at" | "updated_at" | "event_title"
>;
