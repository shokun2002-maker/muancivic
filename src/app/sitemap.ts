import { MetadataRoute } from "next";
import { getPublishedIssues } from "@/lib/data/issues";
import {
  getLatestActivities,
  getLatestNotices,
  getLatestStatements,
} from "@/lib/data/posts";
import { getPublishedVoices } from "@/lib/data/voices";
import { getPublishedMonitoringPosts } from "@/lib/data/monitoring";
import { getPublishedResources } from "@/lib/data/resources";
import { getPublishedMedia } from "@/lib/data/media";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static Public Routes
  const staticRoutes: string[] = [
    "",
    "/about",
    "/about/greeting",
    "/about/declaration",
    "/about/rules",
    "/about/history",
    "/about/organization",
    "/issues",
    "/issues/current",
    "/issues/monitoring",
    "/issues/resources",
    "/issues/voices",
    "/news",
    "/news/activities",
    "/news/notices",
    "/news/statements",
    "/news/media",
    "/join",
    "/join/membership",
    "/join/participate",
    "/join/donate",
    "/join/contact",
    "/privacy",
    "/terms",
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Published Detail Routes (wrapped in try-catch for safe fallback)
  let dynamicSitemap: MetadataRoute.Sitemap = [];
  try {
    const [issues, activities, notices, statements, voices, monitoring, resources, media] =
      await Promise.all([
        getPublishedIssues(),
        getLatestActivities(),
        getLatestNotices(),
        getLatestStatements(),
        getPublishedVoices(),
        getPublishedMonitoringPosts(),
        getPublishedResources(),
        getPublishedMedia(),
      ]);

    const issueUrls: MetadataRoute.Sitemap = issues.map((item) => ({
      url: `${baseUrl}/issues/current/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const activityUrls: MetadataRoute.Sitemap = activities.map((item) => ({
      url: `${baseUrl}/news/activities/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const noticeUrls: MetadataRoute.Sitemap = notices.map((item) => ({
      url: `${baseUrl}/news/notices/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const statementUrls: MetadataRoute.Sitemap = statements.map((item) => ({
      url: `${baseUrl}/news/statements/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const voiceUrls: MetadataRoute.Sitemap = voices.map((item) => ({
      url: `${baseUrl}/issues/voices/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const monitoringUrls: MetadataRoute.Sitemap = monitoring.map((item) => ({
      url: `${baseUrl}/issues/monitoring/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const resourceUrls: MetadataRoute.Sitemap = resources.map((item) => ({
      url: `${baseUrl}/issues/resources/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const mediaUrls: MetadataRoute.Sitemap = media.map((item) => ({
      url: `${baseUrl}/news/media/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    dynamicSitemap = [
      ...issueUrls,
      ...activityUrls,
      ...noticeUrls,
      ...statementUrls,
      ...voiceUrls,
      ...monitoringUrls,
      ...resourceUrls,
      ...mediaUrls,
    ];
  } catch (err) {
    console.warn("[Sitemap] Failed to fetch dynamic published URLs:", err);
  }

  return [...staticSitemap, ...dynamicSitemap];
}
