"use client";

import React, { useState } from "react";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FilterBar from "@/components/FilterBar";
import CategoryBadge from "@/components/CategoryBadge";
import { MONITORING_DATA, MONITORING_CATEGORIES } from "@/data/monitoring";
import { ChevronRight, Eye, Calendar, User, Quote } from "lucide-react";

export default function MonitoringListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredPosts = MONITORING_DATA.filter((item) => {
    if (activeCategory === "전체") return true;
    return item.category === activeCategory;
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
          { name: "정책·행정 모니터링" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Eye className="w-4 h-4" />
              POLICY & GOVERNANCE MONITORING
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              정책·행정 모니터링
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              시민의 눈으로 살펴보고, 시민의 목소리로 제안합니다.
            </p>
          </div>
        </div>

        {/* Operational Principle Banner */}
        <div className="bg-[#0D4938] text-white rounded-3xl p-8 mb-10 shadow-lg relative overflow-hidden flex items-center gap-4">
          <Quote className="w-12 h-12 text-[#F2B544] shrink-0 opacity-80" />
          <div>
            <span className="text-[11px] text-[#F2B544] font-extrabold uppercase tracking-wider block mb-1">
              시민연대 모니터링 수칙
            </span>
            <p className="text-lg sm:text-2xl font-extrabold text-white">
              "감시하되 비난에 머물지 않고, 문제를 지적하되 대안을 제시합니다."
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-10">
          <FilterBar
            categories={MONITORING_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Monitoring Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredPosts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <CategoryBadge category={item.category} />
                  <span className="flex items-center gap-1 text-xs text-[#666666] font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#666666] leading-relaxed line-clamp-3 mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-[#666666]">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.author}</span>
                </span>

                <Link
                  href={`/issues/monitoring/${item.slug}`}
                  className="py-2 px-4 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center gap-1"
                >
                  <span>리포트 자세히 보기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
