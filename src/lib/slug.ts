// src/lib/slug.ts

/**
 * Simple slug generator from a title.
 * Korean characters are stripped, spaces become hyphens,
 * and only alphanumeric and hyphen characters are kept.
 */
export const generateSlug = (title: string): string => {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/[^a-z0-9-]/g, "") // remove non‑alphanumeric
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$|/g, ""); // trim leading/trailing hyphens
};
