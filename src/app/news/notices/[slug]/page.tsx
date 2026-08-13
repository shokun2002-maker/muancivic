import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { getPublishedPostBySlug, getLatestNotices } from "@/lib/data/posts";
import type { NoticePost } from "@/data/notices";
import { ChevronLeft, Calendar, Eye, FileText, Download, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const notice = (await getPublishedPostBySlug("notice", slug)) as NoticePost | null;
  if (!notice) {
    return { title: "공지사항을 찾을 수 없습니다" };
  }
  return {
    title: notice.title,
    description: notice.content?.[0] || "무안 자치주권시민연대 공지사항",
    openGraph: {
      title: notice.title,
      description: notice.content?.[0] || "무안 자치주권시민연대 공지사항",
    },
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const notice = (await getPublishedPostBySlug("notice", slug)) as NoticePost | null;

  if (!notice) {
    notFound();
  }

  const notices = await getLatestNotices();
  const currentIndex = notices.findIndex((n) => n.slug === slug);
  const prevNotice = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;
  const nextNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={notice.title}
        category="공지사항"
        subtitle="무안 자치주권시민연대의 주요 알림 소식"
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "공지사항", href: "/news/notices" },
          { name: notice.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/news/notices"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>공지사항 목록으로 돌아가기</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <CategoryBadge category={notice.category} />
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {notice.date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                조회수 {notice.views}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] leading-tight mb-8">
            {notice.title}
          </h1>

          {/* Body Content */}
          <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed border-t border-gray-100 pt-6">
            {notice.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Attachments Section */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-[#176B52] uppercase tracking-wider mb-3">
                첨부파일
              </h3>
              <div className="space-y-2">
                {notice.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#F7F7F3] rounded-xl flex items-center justify-between border border-gray-200/60"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                      <FileText className="w-4 h-4 text-[#176B52]" />
                      <span>{file.title}</span>
                      <span className="text-gray-400 font-normal">({file.size})</span>
                    </div>
                    <span className="px-3 py-1 bg-[#176B52]/10 text-[#176B52] font-bold text-xs rounded-lg">
                      첨부문서
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next Notice Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {prevNotice ? (
            <Link
              href={`/news/notices/${prevNotice.slug}`}
              className="p-4 bg-white rounded-2xl border border-gray-200/80 hover:border-[#176B52] transition-colors group flex items-center gap-3"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-[#176B52]" />
              <div>
                <span className="text-[11px] text-gray-400 block font-semibold">이전 공지</span>
                <span className="text-xs font-bold text-[#222222] group-hover:text-[#176B52] line-clamp-1">
                  {prevNotice.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextNotice ? (
            <Link
              href={`/news/notices/${nextNotice.slug}`}
              className="p-4 bg-white rounded-2xl border border-gray-200/80 hover:border-[#176B52] transition-colors group flex items-center justify-between text-right gap-3"
            >
              <div>
                <span className="text-[11px] text-gray-400 block font-semibold">다음 공지</span>
                <span className="text-xs font-bold text-[#222222] group-hover:text-[#176B52] line-clamp-1">
                  {nextNotice.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#176B52]" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Share Buttons */}
        <ShareButtons title={notice.title} />
      </div>
    </div>
  );
}
