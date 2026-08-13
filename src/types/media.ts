// DB representation of public.media_albums and public.media_items tables
export interface MediaAlbumDbRow {
  id: string;
  title: string;
  slug: string;
  type: "photo" | "video";
  description: string | null;
  event_date: string | null;
  thumbnail_url: string | null;
  status: "draft" | "published" | "hidden";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaItemDbRow {
  id: string;
  album_id: string;
  media_type: "photo" | "video";
  file_url: string | null;
  youtube_video_id: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
}
