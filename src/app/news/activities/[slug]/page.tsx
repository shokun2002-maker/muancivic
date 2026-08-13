import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { getActivityBySlug } from "@/lib/data/posts";
import { ChevronLeft, Calendar, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getActivityBySlug(slug);
  if (!post) {
    return { title: "활동소식을 찾을 수 없습니다" };
  }
  return {
    title: post.title,
    description: post.summary || "무안 자치주권시민연대 활동소식",
    openGraph: {
      title: post.title,
      description: post.summary || "무안 자치주권시민연대 활동소식",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getActivityBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={post.title}
        category="활동소식"
        subtitle={post.summary}
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "활동소식", href: "/news/activities" },
          { name: post.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/news/activities"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>활동소식 목록으로 돌아가기</span>
        </Link>

        {/* Sample Disclaimer Banner if sample */}
        {post.isSample && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8 flex items-center gap-2.5 text-xs font-bold text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              안내: 본 게시물은 홈페이지 시연을 위한 샘플 기록입니다.
            </span>
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <CategoryBadge category={post.category} />
            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Cover Photo */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Body Content */}
          <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed font-normal border-t border-gray-100 pt-6">
            {post.content.map((p, idx) => (
              <p key={idx} className="bg-[#F7F7F3]/60 p-4 sm:p-5 rounded-2xl">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Share Buttons */}
        <ShareButtons title={post.title} />
      </div>
    </div>
  );
}
