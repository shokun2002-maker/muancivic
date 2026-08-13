import { createClient } from "@/lib/supabase/client";
import { EventDbRow, EventStatus } from "@/types/event";

function generateSlug(title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `event-${Date.now()}-${clean.slice(0, 20)}`;
}

export async function getAdminEvents(): Promise<EventDbRow[]> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client is not available");

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAdminEvents error:", error);
    throw new Error(`행사 목록을 불러오는 중 오류가 발생했습니다: ${error.message}`);
  }

  return (data ?? []) as EventDbRow[];
}

export async function getAdminEventById(id: string): Promise<EventDbRow | null> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client is not available");

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getAdminEventById error:", error);
    throw new Error(`행사 정보를 불러오는 중 오류가 발생했습니다: ${error.message}`);
  }

  return (data as EventDbRow) || null;
}

export interface EventInputPayload {
  title: string;
  category: string;
  description?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  event_date?: string | null;
  location?: string | null;
  status: EventStatus;
  thumbnail_url?: string | null;
}

export async function createEvent(payload: EventInputPayload): Promise<EventDbRow> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client is not available");

  const slug = generateSlug(payload.title);

  const { data, error } = await supabase
    .from("events")
    .insert({
      title: payload.title,
      slug,
      category: payload.category,
      description: payload.description || null,
      start_at: payload.start_at || null,
      end_at: payload.end_at || null,
      event_date: payload.event_date || payload.start_at || null,
      location: payload.location || null,
      status: payload.status,
      thumbnail_url: payload.thumbnail_url || null,
    })
    .select("*")
    .single();

  if (error) {
    console.error("createEvent error:", error);
    throw new Error(`행사 등록 중 오류가 발생했습니다: ${error.message}`);
  }

  return data as EventDbRow;
}

export async function updateEvent(
  id: string,
  payload: Partial<EventInputPayload>
): Promise<EventDbRow> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client is not available");

  const updateData: Record<string, any> = {};
  if (payload.title !== undefined) updateData.title = payload.title;
  if (payload.category !== undefined) updateData.category = payload.category;
  if (payload.description !== undefined) updateData.description = payload.description || null;
  if (payload.start_at !== undefined) updateData.start_at = payload.start_at || null;
  if (payload.end_at !== undefined) updateData.end_at = payload.end_at || null;
  if (payload.event_date !== undefined || payload.start_at !== undefined) {
    updateData.event_date = payload.event_date || payload.start_at || null;
  }
  if (payload.location !== undefined) updateData.location = payload.location || null;
  if (payload.status !== undefined) updateData.status = payload.status;
  if (payload.thumbnail_url !== undefined) updateData.thumbnail_url = payload.thumbnail_url || null;

  const { data, error } = await supabase
    .from("events")
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("updateEvent error:", error);
    throw new Error(`행사 수정 중 오류가 발생했습니다: ${error.message}`);
  }

  return data as EventDbRow;
}

export async function deleteEvent(id: string): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase client is not available");

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    console.error("deleteEvent error:", error);
    throw new Error(`행사 삭제 중 오류가 발생했습니다: ${error.message}`);
  }
}
