import { createClient } from "@/lib/supabase/client";
import { ACTIVITIES_DATA, ActivityPost } from "@/data/activities";
import { NOTICES_DATA, NoticePost } from '@/data/notices';
import { STATEMENTS_DATA, StatementPost } from '@/data/statements';

// Helper to fetch posts of a given type
async function fetchPostsByType(type: string) {
  try {
    const supabase = createClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', type)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) {
      console.warn(`[Supabase] ${type} fetch error:`, error.message);
      return null;
    }
    return data ?? null;
  } catch (err) {
    console.warn('[Supabase] unexpected error fetching', type, err);
    return null;
  }
}

export async function getLatestActivities(): Promise<ActivityPost[]> {
  try {
    const supabase = createClient();
    if (!supabase) {
      return ACTIVITIES_DATA;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", "activity")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[Supabase] getLatestActivities notice:", error.message);
      return ACTIVITIES_DATA;
    }

    return data.map((item: any, idx: number) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "2026.07.24",
      category: item.category || "활동소식",
      summary: item.summary || "",
      coverImage: item.thumbnail_url || "/inaugural_assembly.jpg",
      content: item.content ? item.content.split("\n\n") : [],
      isFeatured: idx === 0,
    }));
  } catch (err) {
    console.warn("[Supabase] getLatestActivities fallback executed:", err);
    return ACTIVITIES_DATA;
  }
}

export async function getActivityBySlug(slug: string): Promise<ActivityPost | null> {
  try {
    const list = await getLatestActivities();
    const found = list.find((a) => a.slug === slug);
    if (found) return found;

    return ACTIVITIES_DATA.find((a) => a.slug === slug) || null;
  } catch {
    return ACTIVITIES_DATA.find((a) => a.slug === slug) || null;
  }
}

// ---------- Notices ----------


export async function getLatestNotices(): Promise<NoticePost[]> {
  try {
    const supabase = createClient();
    if (!supabase) return NOTICES_DATA;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', 'notice')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Supabase] getLatestNotices error:', error.message);
      return NOTICES_DATA;
    }

    // Map DB rows to NoticePost shape. DB may not have noticeNum; we compute based on order.
    return data.map((item: any, idx: number) => ({
      id: item.id,
      noticeNum: idx + 1, // sequence number for UI
      slug: item.slug,
      category: item.category || '공지',
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split('T')[0].replace(/-/g, '.')
        : '',
      views: item.views ?? 0,
      content: item.content ? item.content.split('\n\n') : [],
      // attachments may not exist in DB; leave undefined
    }));
  } catch (err) {
    console.warn('[Supabase] getLatestNotices fallback error:', err);
    return NOTICES_DATA;
  }
}

// ---------- Statements ----------


export async function getLatestStatements(): Promise<StatementPost[]> {
  try {
    const supabase = createClient();
    if (!supabase) return STATEMENTS_DATA;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', 'statement')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Supabase] getLatestStatements error:', error.message);
      return STATEMENTS_DATA;
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      category: item.category,
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split('T')[0].replace(/-/g, '.')
        : '',
      summary: item.summary || '',
      content: item.content ? item.content.split('\n\n') : [],
      isSampleDisclaimer: false,
    }));
  } catch (err) {
    console.warn('[Supabase] getLatestStatements fallback error:', err);
    return STATEMENTS_DATA;
  }
}

// ---------- Common Published Post By Slug ----------

/**
 * Fetch a single published post by its type and slug.
 * Returns null if not found or on error.
 */
export async function getPublishedPostBySlug(
  type: "activity" | "notice" | "statement",
  slug: string
): Promise<ActivityPost | NoticePost | StatementPost | null> {
  try {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', type)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      console.warn(`[Supabase] getPublishedPostBySlug error for ${type}/${slug}:`, error?.message);
      return null;
    }

    // Map based on type
    if (type === 'activity') {
      const item: any = data;
      return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        date: item.published_at
          ? new Date(item.published_at).toISOString().split('T')[0].replace(/-/g, '.')
          : '',
        category: item.category || '활동소식',
        summary: item.summary || '',
        coverImage: item.thumbnail_url || '/inaugural_assembly.jpg',
        content: item.content ? item.content.split('\n\n') : [],
        isFeatured: false,
        isSample: !!item.is_sample,
      } as ActivityPost;
    }

    if (type === 'notice') {
      const item: any = data;
      return {
        id: item.id,
        noticeNum: 0, // not used in detail page
        slug: item.slug,
        category: item.category || '공지',
        title: item.title,
        date: item.published_at
          ? new Date(item.published_at).toISOString().split('T')[0].replace(/-/g, '.')
          : '',
        views: item.views ?? 0,
        content: item.content ? item.content.split('\n\n') : [],
        attachments: item.attachments || [],
      } as NoticePost;
    }

    // statement
    const item: any = data;
    return {
      id: item.id,
      slug: item.slug,
      category: item.category || '성명·논평',
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split('T')[0].replace(/-/g, '.')
        : '',
      summary: item.summary || '',
      content: item.content ? item.content.split('\n\n') : [],
      isSampleDisclaimer: false,
    } as StatementPost;
  } catch (err) {
    console.warn('[Supabase] unexpected error in getPublishedPostBySlug:', err);
    return null;
  }
}
