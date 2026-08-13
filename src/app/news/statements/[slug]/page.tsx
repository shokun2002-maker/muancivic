import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { getPublishedPostBySlug, getLatestStatements } from "@/lib/data/posts";
import type { StatementPost } from "@/data/statements";
import { ChevronLeft, Calendar, FileText, Download, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const statement = (await getPublishedPostBySlug("statement", slug)) as StatementPost | null;
  if (!statement) {
    return { title: "성명·논평을 찾을 수 없습니다" };
  }
  return {
    title: statement.title,
    description: statement.summary || "무안 자치주권시민연대 성명·논평",
    openGraph: {
      title: statement.title,
      description: statement.summary || "무안 자치주권시민연대 성명·논평",
    },
  };
}

export default async function StatementDetailPage({ params }: Props) {
  const { slug } = await params;
  const statement = (await getPublishedPostBySlug("statement", slug)) as StatementPost | null;

  if (!statement) {
    notFound();
  }

  const statements = await getLatestStatements();
  const currentIndex = statements.findIndex((s) => s.slug === slug);
  const prevStatement = currentIndex < statements.length - 1 ? statements[currentIndex + 1] : null;
  const nextStatement = currentIndex > 0 ? statements[currentIndex - 1] : null;

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={statement.title}
        category="성명·논평"
        subtitle="지역 현안에 대한 시민연대의 생각과 입장을 전합니다."
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "성명·논평", href: "/news/statements" },
          { name: statement.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/news/statements"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>성명·논평 목록으로 돌아가기</span>
        </Link>

        {/* Disclaimer Notice Banner if sample */}
        {statement.isSampleDisclaimer && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8 flex items-center justify-between text-xs font-bold text-amber-800">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                안내: 본 성명·논평은 홈페이지 시연용 예시 콘텐츠이며 실제 공식 성명이 아닙니다.
              </span>
            </div>
            <span className="bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded text-[10px]">
              시연용 예시
            </span>
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <CategoryBadge category={statement.category} />
            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              발표일자: {statement.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] leading-tight mb-6">
            {statement.title}
          </h1>

          {statement.summary && (
            <div className="p-4 bg-[#F7F7F3] rounded-2xl border border-gray-200/60 text-sm font-bold text-[#176B52] mb-8">
              {statement.summary}
            </div>
          )}

          {/* Body Content */}
          <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed border-t border-gray-100 pt-6">
            {statement.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Attachments Section */}
          {statement.attachments && statement.attachments.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-[#176B52] uppercase tracking-wider mb-3">
                성명서 원문 첨부파일
              </h3>
              <div className="space-y-2">
                {statement.attachments.map((file, idx) => (
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

        {/* Share Buttons */}
        <ShareButtons title={statement.title} />
      </div>
    </div>
  );
}
