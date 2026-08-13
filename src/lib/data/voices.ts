import { createClient } from "@/lib/supabase/client";
import type { VoiceDbRow } from "@/types/voice";
import type { CitizenVoice, VoiceCategory, VoiceStatus } from "@/data/voices";

function normalizeVoiceCategory(cat: string): VoiceCategory {
  const allowed: VoiceCategory[] = [
    "교통",
    "환경",
    "농어업",
    "교육",
    "복지",
    "청년",
    "문화·관광",
    "지역경제",
    "행정",
    "기타",
  ];
  return allowed.includes(cat as VoiceCategory) ? (cat as VoiceCategory) : "기타";
}

function normalizeVoiceStatus(st: string): VoiceStatus {
  const allowed: VoiceStatus[] = [
    "접수",
    "검토 중",
    "공론화",
    "정책제안",
    "답변완료",
  ];
  return allowed.includes(st as VoiceStatus) ? (st as VoiceStatus) : "접수";
}

function mapDbToPublic(item: VoiceDbRow): CitizenVoice {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0].replace(/-/g, ".");
  };

  return {
    id: item.id,
    slug: item.slug,
    category: normalizeVoiceCategory(item.category),
    title: item.title,
    content: item.content,
    likesCount: item.likes_count ?? 0,
    status: normalizeVoiceStatus(item.status),
    date: formatDate(item.created_at),
    author: item.author_name || "군민",
    isSample: false,
  };
}

/** Fetch all published citizen voices from Supabase */
export async function getPublishedVoices(): Promise<CitizenVoice[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("citizen_voices")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[Supabase] getPublishedVoices notice:", error.message);
    return [];
  }

  const rows = (data ?? []) as VoiceDbRow[];
  return rows.map(mapDbToPublic);
}

/** Fetch a single published citizen voice by slug from Supabase */
export async function getPublishedVoiceBySlug(
  slug: string
): Promise<CitizenVoice | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("citizen_voices")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (error) {
    console.warn("[Supabase] getPublishedVoiceBySlug notice:", error.message);
    return null;
  }

  const item = data as VoiceDbRow;
  return mapDbToPublic(item);
}
