import { createClient } from "@/lib/supabase/client";
import { ActivityPost } from "@/data/activities";
import { NoticePost } from "@/data/notices";
import { StatementPost } from "@/data/statements";

export async function getLatestActivities(): Promise<ActivityPost[]> {
  try {
    const supabase = createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", "activity")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) {
      if (error) console.warn("[Supabase] getLatestActivities error:", error.message);
      return [];
    }

    return data.map((item: any, idx: number) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "",
      category: item.category || "활동소식",
      summary: item.summary || "",
      coverImage: item.thumbnail_url || "/inaugural_assembly.jpg",
      content: item.content ? item.content.split("\n\n") : [],
      isFeatured: idx === 0,
    }));
  } catch (err) {
    console.warn("[Supabase] getLatestActivities error:", err);
    return [];
  }
}

export async function getActivityBySlug(slug: string): Promise<ActivityPost | null> {
  const post = await getPublishedPostBySlug("activity", slug);
  return (post as ActivityPost) || null;
}

// ---------- Notices ----------

export async function getLatestNotices(): Promise<NoticePost[]> {
  try {
    const supabase = createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", "notice")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) {
      if (error) console.warn("[Supabase] getLatestNotices error:", error.message);
      return [];
    }

    return data.map((item: any, idx: number) => ({
      id: item.id,
      noticeNum: idx + 1,
      slug: item.slug,
      category: item.category || "공지",
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "",
      views: item.views ?? 0,
      content: item.content ? item.content.split("\n\n") : [],
    }));
  } catch (err) {
    console.warn("[Supabase] getLatestNotices error:", err);
    return [];
  }
}

// ---------- Statements ----------

export async function getLatestStatements(): Promise<StatementPost[]> {
  try {
    const supabase = createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", "statement")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) {
      if (error) console.warn("[Supabase] getLatestStatements error:", error.message);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      category: item.category || "성명·논평",
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "",
      summary: item.summary || "",
      content: item.content ? item.content.split("\n\n") : [],
      isSampleDisclaimer: false,
    }));
  } catch (err) {
    console.warn("[Supabase] getLatestStatements error:", err);
    return [];
  }
}

// ---------- Common Published Post By Slug ----------

export async function getPublishedPostBySlug(
  type: "activity" | "notice" | "statement",
  slug: string
): Promise<ActivityPost | NoticePost | StatementPost | null> {
  try {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", type)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      return null;
    }

    if (type === "activity") {
      const item: any = data;
      return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        date: item.published_at
          ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
          : "",
        category: item.category || "활동소식",
        summary: item.summary || "",
        coverImage: item.thumbnail_url || "/inaugural_assembly.jpg",
        content: item.content ? item.content.split("\n\n") : [],
        isFeatured: false,
        isSample: !!item.is_sample,
      } as ActivityPost;
    }

    if (type === "notice") {
      const item: any = data;
      return {
        id: item.id,
        noticeNum: 0,
        slug: item.slug,
        category: item.category || "공지",
        title: item.title,
        date: item.published_at
          ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
          : "",
        views: item.views ?? 0,
        content: item.content ? item.content.split("\n\n") : [],
        attachments: item.attachments || [],
      } as NoticePost;
    }

    const item: any = data;
    return {
      id: item.id,
      slug: item.slug,
      category: item.category || "성명·논평",
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "",
      summary: item.summary || "",
      content: item.content ? item.content.split("\n\n") : [],
      isSampleDisclaimer: false,
    } as StatementPost;
  } catch (err) {
    console.warn("[Supabase] error in getPublishedPostBySlug:", err);
    return null;
  }
}
