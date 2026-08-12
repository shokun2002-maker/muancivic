"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubHero from "@/components/SubHero";
import StatusBadge from "@/components/StatusBadge";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { getIssueBySlug } from "@/lib/data/issues";
import { IssueArticle } from "@/data/issues";
import { ChevronLeft, FileText, CheckCircle2, Calendar, Download, Loader2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function IssueDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [issue, setIssue] = useState<IssueArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      const data = await getIssueBySlug(slug);
      setIssue(data);
      setLoading(false);
    }
    loadDetail();
  }, [slug]);

  if (!loading && !issue) {
    notFound();
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
        <p className="text-xs font-bold text-gray-500">현안 정보를 읽어오는 중입니다...</p>
      </div>
    );
  }

  if (!issue) return null;

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={issue.title}
        category="주요 현안"
        subtitle={issue.summary}
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "주요 현안", href: "/issues/current" },
          { name: issue.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/issues/current"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>주요 현안 목록으로 돌아가기</span>
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CategoryBadge category={issue.category} />
            <StatusBadge status={issue.status} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] leading-tight mb-4">
            {issue.title}
          </h1>

          <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-8">
            {issue.summary}
          </p>

          {/* Cover Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src={issue.coverImage}
              alt={issue.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* SECTION 1: 현안 개요 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <h2 className="text-xl font-extrabold text-[#222222] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#176B52]" />
            1. 현안 개요
          </h2>
          <div className="space-y-4 text-base text-[#333333] leading-relaxed">
            {issue.overview.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* SECTION 2: 현재 상황 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <h2 className="text-xl font-extrabold text-[#222222] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2878A7]" />
            2. 현재 상황
          </h2>
          <div className="space-y-4 text-base text-[#333333] leading-relaxed">
            {issue.currentStatus.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* SECTION 3: 주요 쟁점 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <h2 className="text-xl font-extrabold text-[#222222] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2B544]" />
            3. 주요 쟁점
          </h2>
          <ul className="space-y-3 text-base text-[#333333] leading-relaxed">
            {issue.keyPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2B544] mt-2.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 4: 시민연대의 입장 */}
        <div className="bg-[#176B52]/10 rounded-3xl p-8 sm:p-10 border border-[#176B52]/30 mb-10">
          <h2 className="text-xl font-extrabold text-[#0D4938] mb-4 pb-3 border-b border-[#176B52]/20 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#176B52]" />
            4. 무안 자치주권시민연대의 입장
          </h2>
          <div className="space-y-4 text-base text-[#124d3a] leading-relaxed font-medium">
            {issue.alliancePosition.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* SECTION 5: 핵심 원칙 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <h2 className="text-xl font-extrabold text-[#222222] mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#176B52]" />
            5. 핵심 원칙
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {issue.corePrinciples.map((pr, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F7F7F3] rounded-2xl border border-gray-200/80 font-bold text-sm text-[#222222] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#176B52]" />
                <span>{pr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: 진행 과정 Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <h2 className="text-xl font-extrabold text-[#222222] mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#176B52]" />
            6. 진행 경과 (TIMELINE)
          </h2>
          <div className="space-y-4">
            {issue.timeline.map((tl, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F7F7F3] rounded-2xl flex items-start gap-4 border border-gray-100"
              >
                <span className="px-3 py-1 bg-[#176B52] text-white text-xs font-bold rounded-lg shrink-0">
                  {tl.dateStr}
                </span>
                <span className="text-sm font-semibold text-[#333333] pt-0.5">
                  {tl.content}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: 관련자료 다운로드 (Sample) */}
        {issue.relatedFiles && issue.relatedFiles.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm mb-10">
            <h3 className="text-base font-extrabold text-[#222222] mb-4">
              7. 관련 자료 및 문서
            </h3>
            <div className="space-y-2">
              {issue.relatedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-200/60"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                    <FileText className="w-4 h-4 text-[#176B52]" />
                    <span>{file.title}</span>
                    <span className="text-gray-400 font-normal">({file.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("샘플 자료 다운로드 링크입니다.")}
                    className="px-3 py-1.5 bg-[#176B52]/10 hover:bg-[#176B52] text-[#176B52] hover:text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>다운로드</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 8: SNS 공유 */}
        <ShareButtons title={issue.title} />
      </div>
    </div>
  );
}
