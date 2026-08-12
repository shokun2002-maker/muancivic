"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubHero from "@/components/SubHero";
import FilterBar from "@/components/FilterBar";
import StatusBadge from "@/components/StatusBadge";
import CategoryBadge from "@/components/CategoryBadge";
import { ISSUES_DATA, ISSUE_CATEGORIES } from "@/data/issues";
import { ChevronRight, Compass } from "lucide-react";

export default function CurrentIssuesListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredIssues = ISSUES_DATA.filter((item) => {
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
              우리가 함께 살펴봐야 할 무안의 중요한 이야기
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

        {/* Issues Grid */}
        {filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredIssues.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <CategoryBadge category={item.category} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <StatusBadge status={item.status} />
                    </div>

                    <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-4">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/issues/current/${item.slug}`}
                    className="w-full py-2.5 px-4 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-between"
                  >
                    <span>자세히 보기</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <p className="text-sm font-bold text-gray-500">
              해당 카테고리의 주요 현안이 아직 등록되지 않았습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
