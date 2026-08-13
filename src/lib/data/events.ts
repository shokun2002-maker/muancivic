import { createClient } from "@/lib/supabase/client";
import { EventDbRow } from "@/types/event";

export async function getPublicEvents(): Promise<EventDbRow[]> {
  try {
    const supabase = createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_at", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error || !data) {
      if (error) console.warn("[Supabase] getPublicEvents error:", error.message);
      return [];
    }

    return data as EventDbRow[];
  } catch (err) {
    console.warn("[Supabase] getPublicEvents unexpected error:", err);
    return [];
  }
}

export async function getPublicEventBySlug(slug: string): Promise<EventDbRow | null> {
  try {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      if (error) console.warn("[Supabase] getPublicEventBySlug error:", error?.message);
      return null;
    }

    return data as EventDbRow;
  } catch (err) {
    console.warn("[Supabase] getPublicEventBySlug unexpected error:", err);
    return null;
  }
}

export function formatEventSchedule(evt: EventDbRow): string {
  const formatDateStr = (isoStr: string): string => {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return `${year}. ${month}. ${date}.`;
  };

  if (evt.start_at) {
    const startFormatted = formatDateStr(evt.start_at);
    if (evt.end_at) {
      const endFormatted = formatDateStr(evt.end_at);
      if (startFormatted === endFormatted) {
        return startFormatted;
      }
      return `${startFormatted} ~ ${endFormatted}`;
    }
    return startFormatted;
  }

  // Legacy fallback
  if (evt.event_date) {
    return evt.event_date;
  }

  if (evt.status === "상시모집") {
    return "상시 진행";
  }

  return "일정 추후 공지";
}
