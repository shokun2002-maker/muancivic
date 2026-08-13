import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { getPublishedResourceBySlug } from "@/lib/data/resources";
import { ChevronLeft, Calendar, Building2, Download, FileText, BookOpen } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getPublishedResourceBySlug(slug);
  if (!resource) {
    return { title: "정책자료를 찾을 수 없습니다" };
  }
  return {
    title: resource.title,
    description: resource.description || "무안 자치주권시민연대 정책자료",
    openGraph: {
      title: resource.title,
      description: resource.description || "무안 자치주권시민연대 정책자료",
    },
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = await getPublishedResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={resource.title}
        category="정책자료실"
        subtitle={resource.description}
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "정책자료실", href: "/issues/resources" },
          { name: resource.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/issues/resources"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>정책자료실 목록으로 돌아가기</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <CategoryBadge category={resource.category} />
            <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
              {resource.fileFormat} | {resource.fileSize}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] leading-tight mb-4">
            {resource.title}
          </h1>

          <p className="text-base text-[#666666] leading-relaxed mb-6">
            {resource.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#176B52]" />
              출처/작성기관: <strong className="text-[#222222]">{resource.source}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#176B52]" />
              발행일자: <strong className="text-[#222222]">{resource.date}</strong>
            </span>
          </div>
        </div>

        {/* Content Body */}
        {resource.contentBody && resource.contentBody.length > 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
            <h2 className="text-lg font-extrabold text-[#222222] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#176B52]" />
              자료 개요 및 주요 목차
            </h2>
            <div className="space-y-4 text-base text-[#333333] leading-relaxed">
              {resource.contentBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* Download File Box */}
        <div className="bg-[#176B52]/10 rounded-3xl p-8 border border-[#176B52]/30 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#176B52] text-white rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0D4938]">{resource.title}.pdf</h3>
              <p className="text-xs text-emerald-800">
                파일 형식: {resource.fileFormat} ({resource.fileSize})
              </p>
            </div>
          </div>

          <a
            href="#download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-sm rounded-xl shadow transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>원문 다운로드</span>
          </a>
        </div>

        {/* Share Buttons */}
        <ShareButtons title={resource.title} />
      </div>
    </div>
  );
}
