import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedVoiceBySlug } from "@/lib/data/voices";
import VoiceDetailClient from "@/components/VoiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const voice = await getPublishedVoiceBySlug(slug);
  if (!voice) {
    return { title: "시민의 목소리를 찾을 수 없습니다" };
  }
  return {
    title: voice.title,
    description: voice.content?.slice(0, 100) || "무안 자치주권시민연대 시민의 목소리",
    openGraph: {
      title: voice.title,
      description: voice.content?.slice(0, 100) || "무안 자치주권시민연대 시민의 목소리",
    },
  };
}

export default async function VoiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const voice = await getPublishedVoiceBySlug(slug);

  if (!voice) {
    notFound();
  }

  return <VoiceDetailClient voice={voice} />;
}
