"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SubHero from "@/components/SubHero";
import FilterBar from "@/components/FilterBar";
import StatusBadge from "@/components/StatusBadge";
import CategoryBadge from "@/components/CategoryBadge";
import { getPublishedIssues } from "@/lib/data/issues";
import { ISSUE_CATEGORIES, IssueArticle } from "@/data/issues";
import { Compass, Calendar, ChevronRight, Loader2 } from "lucide-react";

export default function CurrentIssuesListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [issues, setIssues] = useState<IssueArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPublishedIssues();
      setIssues(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredIssues = issues.filter((item) => {
    if (activeCategory === "전체") return true;
    return item.category.includes(activeCategory);
  });

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="무안 이슈"
        category="무안 이슈"
        subtitle="시민의 눈으로 무안을 살펴보고, 시민의 목소리로 대안을 만들어갑니다."
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "주요 현안" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              MUAN KEY ISSUES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              주요 현안
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              무안의 미래와 군민의 삶에 직결된 주요 의제입니다.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-10">
          <FilterBar
            categories={ISSUE_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-500">현안 목록을 불러오고 있습니다...</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredIssues.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <CategoryBadge category={item.category} />
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed line-clamp-3 mb-6">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      상시 모니터링 중
                    </span>

                    <Link
                      href={`/issues/current/${item.slug}`}
                      className="py-2 px-4 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                    >
                      <span>현안 8대 분석 보기</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
