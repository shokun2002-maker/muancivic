"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import StatusBadge from "@/components/StatusBadge";
import ShareButtons from "@/components/ShareButtons";
import { getPublishedVoiceBySlug } from "@/lib/data/voices";
import { CitizenVoice } from "@/data/voices";
import { ChevronLeft, ThumbsUp, Calendar, User, ShieldCheck, Loader2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function VoiceDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [voice, setVoice] = useState<CitizenVoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundTriggered, setNotFoundTriggered] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPublishedVoiceBySlug(slug);
      if (!data) {
        setNotFoundTriggered(true);
      } else {
        setVoice(data);
        setLikesCount(data.likesCount);
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (notFoundTriggered) {
    notFound();
  }

  if (loading || !voice) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
        <p className="text-xs font-bold text-gray-500">시민의 목소리를 읽어오고 있습니다...</p>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      setLikesCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={voice.title}
        category="시민의 목소리"
        subtitle="무안의 변화는 시민의 목소리에서 시작됩니다."
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "시민의 목소리", href: "/issues/voices" },
          { name: voice.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/issues/voices"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>시민의 목소리 목록으로 돌아가기</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <CategoryBadge category={voice.category} />
              <StatusBadge status={voice.status} />
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {voice.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {voice.date}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] leading-snug mb-6">
            "{voice.title}"
          </h1>

          <div className="p-6 bg-[#F7F7F3] rounded-2xl border border-gray-200/60 text-base text-[#333333] leading-relaxed mb-8">
            <p className="whitespace-pre-wrap">{voice.content}</p>
          </div>

          {/* Like Action Box */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium">
              이 시민 제안에 공감하시나요?
            </span>

            <button
              type="button"
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-xs ${
                isLiked
                  ? "bg-red-500 text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
              <span>공감해요 ({likesCount})</span>
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <ShareButtons title={voice.title} />
      </div>
    </div>
  );
}
