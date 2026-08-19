import { createClient } from "@/lib/supabase/client";
import { EventApplicationDbRow, EventApplicationInput } from "@/types/event_application";

/**
 * Public function to submit an event application.
 */
export async function submitEventApplication(
  input: Omit<EventApplicationInput, "status">
): Promise<EventApplicationDbRow> {
  const supabase = createClient();
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  if (!input.privacy_agreed) {
    throw new Error("개인정보 수집 및 이용에 동의하셔야 신청이 가능합니다.");
  }

  const { data, error } = await supabase
    .from("event_applications")
    .insert({
      event_id: input.event_id,
      applicant_name: input.applicant_name.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      participant_count: Number(input.participant_count) || 1,
      message: input.message?.trim() || null,
      privacy_agreed: true,
      status: "received",
    })
    .select()
    .single();

  if (error) {
    console.error("submitEventApplication error:", error);
    throw new Error(`참가 신청 제출 중 오류가 발생했습니다. (${error.message})`);
  }

  return data as EventApplicationDbRow;
}

/**
 * Admin function to fetch event applications.
 */
export async function getAdminEventApplications(
  eventId?: string
): Promise<EventApplicationDbRow[]> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  let query = supabase
    .from("event_applications")
    .select(`
      *,
      events (
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (eventId) {
    query = query.eq("event_id", eventId);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getAdminEventApplications error:", error);
    throw error;
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    event_title: row.events?.title || "행사",
  })) as EventApplicationDbRow[];
}

/**
 * Admin function to update event application status.
 */
export async function updateEventApplicationStatus(
  id: string,
  status: "received" | "confirmed" | "cancelled"
): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase
    .from("event_applications")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("updateEventApplicationStatus error:", error);
    throw error;
  }
}
