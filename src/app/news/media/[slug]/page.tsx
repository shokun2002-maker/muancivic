import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedMediaBySlug } from "@/lib/data/media";
import MediaDetailClient from "@/components/MediaDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await getPublishedMediaBySlug(slug);
  if (!album) {
    return { title: "사진·영상을 찾을 수 없습니다" };
  }
  return {
    title: album.title,
    description: album.description || "무안 자치주권시민연대 미디어 갤러리",
    openGraph: {
      title: album.title,
      description: album.description || "무안 자치주권시민연대 미디어 갤러리",
      images: album.coverImage ? [{ url: album.coverImage }] : [],
    },
  };
}

export default async function MediaDetailPage({ params }: Props) {
  const { slug } = await params;
  const album = await getPublishedMediaBySlug(slug);

  if (!album) {
    notFound();
  }

  return <MediaDetailClient album={album} />;
}
