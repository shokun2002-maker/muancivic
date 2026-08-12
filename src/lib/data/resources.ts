import { createClient } from "@/lib/supabase/client";
import { RESOURCES_DATA, PolicyResource } from "@/data/resources";

export async function getPublishedResources(): Promise<PolicyResource[]> {
  try {
    const supabase = createClient();
    if (!supabase) return RESOURCES_DATA;

    const { data, error } = await supabase
      .from("policy_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[Supabase] getPublishedResources notice:", error.message);
      return RESOURCES_DATA;
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      category: item.category,
      title: item.title,
      date: item.published_at
        ? new Date(item.published_at).toISOString().split("T")[0].replace(/-/g, ".")
        : "2026.07.24",
      description: item.summary || "",
      fileSize: "2.5 MB",
      fileFormat: "PDF",
      source: item.source,
      fileUrl: item.file_url,
      hasFile: true,
    }));
  } catch (err) {
    console.warn("[Supabase] getPublishedResources fallback executed:", err);
    return RESOURCES_DATA;
  }
}
