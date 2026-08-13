import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { getPublishedMonitoringPostBySlug } from "@/lib/data/monitoring";
import { ChevronLeft, Eye, Calendar, User, Quote, AlertCircle, CalendarCheck, Lightbulb, HelpCircle, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedMonitoringPostBySlug(slug);
  if (!post) {
    return { title: "모니터링 보고서를 찾을 수 없습니다" };
  }
  return {
    title: post.title,
    description: post.summary || "무안 정책·행정 모니터링 보고서",
    openGraph: {
      title: post.title,
      description: post.summary || "무안 정책·행정 모니터링 보고서",
    },
  };
}

export default async function MonitoringDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedMonitoringPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={post.title}
        category="정책·행정 모니터링"
        subtitle={post.summary}
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "정책·행정 모니터링", href: "/issues/monitoring" },
          { name: post.title },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/issues/monitoring"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>모니터링 목록으로 돌아가기</span>
        </Link>

        {/* Disclaimer Notice Banner if sample */}
        {post.isSampleDisclaimer && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8 flex items-center gap-2.5 text-xs font-bold text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              본 리포트는 홈페이지 시연용 예시 샘플입니다. 실제 무안군 공식 수치나 통계와 상이할 수 있습니다.
            </span>
          </div>
        )}

        {/* Operational Principle Banner */}
        <div className="bg-[#0D4938] text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-lg flex items-center gap-4">
          <Quote className="w-10 h-10 text-[#F2B544] shrink-0" />
          <p className="text-base sm:text-xl font-extrabold">
            "감시하되 비난에 머물지 않고, 문제를 지적하되 대안을 제시합니다."
          </p>
        </div>

        {/* Header Title Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-12">
          <div className="flex items-center justify-between gap-2 mb-4">
            <CategoryBadge category={post.category} />
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {post.author}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-base text-[#666666] leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* 1. 무엇을 살펴봤나요? */}
        {post.targetExamined && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm mb-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#222222] mb-3 pb-3 border-b border-gray-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#176B52]" />
              1. 무엇을 살펴봤나요?
            </h2>
            <p className="text-base text-[#333333] leading-relaxed">
              {post.targetExamined}
            </p>
          </div>
        )}

        {/* 2. 현재 어떻게 진행되고 있나요? */}
        {post.currentProgress && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm mb-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#222222] mb-3 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#2878A7]" />
              2. 현재 어떻게 진행되고 있나요?
            </h2>
            <p className="text-base text-[#333333] leading-relaxed">
              {post.currentProgress}
            </p>
          </div>
        )}

        {/* 3. 무엇이 쟁점인가요? */}
        {post.keyIssuePoint && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm mb-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#222222] mb-3 pb-3 border-b border-gray-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#F2B544]" />
              3. 무엇이 쟁점인가요?
            </h2>
            <p className="text-base text-[#333333] leading-relaxed font-semibold">
              {post.keyIssuePoint}
            </p>
          </div>
        )}

        {/* 4. 시민연대는 이렇게 봅니다 */}
        {post.alliancePerspective && (
          <div className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-200 mb-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0D4938] mb-3 pb-3 border-b border-emerald-200/60 flex items-center gap-2">
              <Quote className="w-5 h-5 text-[#176B52]" />
              4. 무안 자치주권시민연대는 이렇게 봅니다
            </h2>
            <p className="text-base text-[#124d3a] leading-relaxed font-medium">
              {post.alliancePerspective}
            </p>
          </div>
        )}

        {/* 5. 시민연대의 제안 */}
        {post.proposalText && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#176B52] shadow-sm mb-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#176B52] mb-3 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#F2B544]" />
              5. 무안 자치주권시민연대의 대안 제안
            </h2>
            <p className="text-base sm:text-lg text-[#222222] font-bold leading-relaxed">
              {post.proposalText}
            </p>
          </div>
        )}

        {/* 6. 진행상황 Timeline */}
        {post.statusTimeline && post.statusTimeline.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm mb-8">
            <h3 className="text-base font-extrabold text-[#222222] mb-4 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#176B52]" />
              6. 모니터링 진행 경과
            </h3>
            <div className="space-y-3">
              {post.statusTimeline.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <span className="px-2.5 py-1 bg-[#176B52]/10 text-[#176B52] font-bold rounded-md shrink-0">
                    {item.dateStr}
                  </span>
                  <span className="text-[#333333] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#176B52]" />
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SNS 공유 */}
        <ShareButtons title={post.title} />
      </div>
    </div>
  );
}
