"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import { ACTIVITIES_DATA } from "@/data/activities";
import { Sparkles, Calendar, ChevronRight, ArrowRight, ChevronLeft } from "lucide-react";

export default function ActivitiesListPage() {
  const [currentPage] = useState(1);
  const featuredPost = ACTIVITIES_DATA.find((a) => a.isFeatured) || ACTIVITIES_DATA[0];
  const listPosts = ACTIVITIES_DATA.filter((a) => a.id !== featuredPost.id);

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="시민연대 소식"
        category="시민연대 소식"
        subtitle="시민이 움직이면 무안이 달라집니다."
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "활동소식" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              ACTIVITIES & NEWS
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              활동소식
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              시민연대의 발걸음 하나하나가 무안 자치주권 확립의 역사가 됩니다.
            </p>
          </div>
        </div>

        {/* FEATURED POST (Big Large Card) */}
        {featuredPost && (
          <div className="mb-14 bg-[#0D4938] rounded-3xl overflow-hidden shadow-xl text-white grid grid-cols-1 lg:grid-cols-12 border border-[#176B52]/40 group">
            <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[300px] overflow-hidden">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#0D4938]/80 lg:to-[#0D4938]" />
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#F2B544] text-[#0D4938] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    대표 대표소식
                  </span>
                  <span className="flex items-center gap-1 text-xs text-emerald-100 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug text-white mb-4 group-hover:text-[#F2B544] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-emerald-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-200">
                  무안 자치주권시대 공식 선언 현장
                </span>
                <Link
                  href={`/news/activities/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0D4938] hover:bg-[#F2B544] hover:text-[#0D4938] font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 shadow"
                >
                  <span>소식 전문 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ADDITIONAL ACTIVITIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {listPosts.map((item) => (
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
                  <div className="absolute top-3 left-3 z-10">
                    <CategoryBadge category={item.category} />
                  </div>
                </div>

                <div className="p-6">
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>

                  <h3 className="text-base font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/news/activities/${item.slug}`}
                  className="w-full py-2.5 px-4 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-between"
                >
                  <span>자세히 보기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION UI */}
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            disabled
            className="p-2 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 bg-[#176B52] text-white text-xs font-bold rounded-xl shadow-xs">
            {currentPage}
          </span>
          <button
            type="button"
            disabled
            className="p-2 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
