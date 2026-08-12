"use client";

import React from "react";
import Link from "next/link";
import { FEATURED_ACTIVITY, ADDITIONAL_ACTIVITIES } from "@/data/mockData";
import { Calendar, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

export default function ActivityNewsSection() {
  return (
    <section id="news" className="py-16 sm:py-24 bg-white border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            ACTIVITIES & NEWS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            시민이 움직이면 무안이 달라집니다
          </h2>
          <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
            시민연대의 발걸음 하나하나가 지역 자치주권 확립의 소중한 역사가 됩니다.
          </p>
        </div>

        {/* Content Layout: Featured (Left) + List (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Large Card (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#176B52] to-[#0D4938] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
            {/* Background Pattern Decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8 pointer-events-none">
              <Sparkles className="w-64 h-64 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#F2B544] text-[#0D4938] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  대표 소식
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {FEATURED_ACTIVITY.date}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4 group-hover:text-[#F2B544] transition-colors">
                {FEATURED_ACTIVITY.title}
              </h3>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8 font-light">
                {FEATURED_ACTIVITY.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-emerald-700/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200">
                무안 자치주권시대 공식 선언
              </span>
              <Link
                href="#activity-featured"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0D4938] hover:bg-[#F2B544] hover:text-[#0D4938] font-bold text-xs sm:text-sm rounded-lg transition-all duration-200"
              >
                <span>소식 전문 보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Additional Activities List (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {ADDITIONAL_ACTIVITIES.map((act) => (
                <div
                  key={act.id}
                  className="bg-[#F7F7F3] rounded-2xl p-5 border border-gray-200/80 hover:bg-white hover:shadow-md hover:border-[#176B52]/40 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                    <span className="font-semibold text-[#176B52]">{act.category}</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {act.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#222222] group-hover:text-[#176B52] transition-colors line-clamp-1 mb-1.5">
                    {act.title}
                  </h4>

                  <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                    {act.summary}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="#activity-news-all"
              className="w-full py-3.5 px-4 bg-[#F7F7F3] hover:bg-[#176B52]/10 border border-gray-200 text-[#176B52] font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>활동소식 더보기</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
