import { createClient } from "@/lib/supabase/client";
import { MEDIA_DATA, MediaAlbum } from "@/data/media";

export async function getMediaAlbums(): Promise<MediaAlbum[]> {
  try {
    const supabase = createClient();
    if (!supabase) return MEDIA_DATA;

    const { data, error } = await supabase
      .from("media_albums")
      .select("*, media_items(*)")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[Supabase] getMediaAlbums notice:", error.message);
      return MEDIA_DATA;
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      date: item.event_date || "2026.07.24",
      type: item.type as "photo" | "video",
      coverImage: item.thumbnail_url || "/inaugural_assembly.jpg",
      description: item.description || "",
      photoList: item.media_items
        ? item.media_items.map((m: any) => m.file_url || "/inaugural_assembly.jpg")
        : ["/inaugural_assembly.jpg"],
    }));
  } catch (err) {
    console.warn("[Supabase] getMediaAlbums fallback executed:", err);
    return MEDIA_DATA;
  }
}
