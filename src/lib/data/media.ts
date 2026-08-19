import { createClient } from "@/lib/supabase/client";
import type { MediaAlbumDbRow, MediaItemDbRow } from "@/types/media";
import type { MediaAlbum } from "@/data/media";

function mapDbToPublic(item: MediaAlbumDbRow, items?: MediaItemDbRow[]): MediaAlbum {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0].replace(/-/g, ".");
  };

  const coverImage = item.thumbnail_url || "/images/placeholders/media-default.svg";
  const photoList = items && items.length > 0
    ? items.map((i) => i.file_url).filter((url): url is string => !!url)
    : [coverImage];

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    date: formatDate(item.event_date || item.published_at || item.created_at),
    type: item.type as "photo" | "video",
    coverImage,
    description: item.description || "",
    photoList,
  };
}

/** Fetch all published media albums from Supabase */
export async function getPublishedMedia(): Promise<MediaAlbum[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("media_albums")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.warn("[Supabase] getPublishedMedia notice:", error.message);
    return [];
  }

  const rows = (data ?? []) as MediaAlbumDbRow[];
  return rows.map((r) => mapDbToPublic(r));
}

/** Fetch a single published media album by slug from Supabase */
export async function getPublishedMediaBySlug(
  slug: string
): Promise<MediaAlbum | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data: album, error: albumError } = await supabase
    .from("media_albums")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (albumError || !album) {
    console.warn("[Supabase] getPublishedMediaBySlug notice:", albumError?.message);
    return null;
  }

  const dbAlbum = album as MediaAlbumDbRow;

  // Fetch child media items for photoList
  const { data: items } = await supabase
    .from("media_items")
    .select("*")
    .eq("album_id", dbAlbum.id)
    .order("sort_order", { ascending: true });

  const dbItems = (items ?? []) as MediaItemDbRow[];
  return mapDbToPublic(dbAlbum, dbItems);
}
