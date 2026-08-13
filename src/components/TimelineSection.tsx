"use client";

import React from "react";
import Link from "next/link";
import { TIMELINE_DATA } from "@/data/mockData";
import { History, ChevronRight, CheckCircle2 } from "lucide-react";

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-16 sm:py-24 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5" />
              OUR HISTORY & JOURNEY
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              우리의 시작
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
              2025.04 <span className="text-[#176B52] font-bold">→</span> 2026.07.24 (시민주권 수호를 향한 소중한 여정)
            </p>
          </div>

          <Link
            href="/about/history"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-[#176B52] text-[#176B52] font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all"
          >
            <span>시민연대가 걸어온 길</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Timeline Desktop Horizontal & Mobile Vertical Layout */}
        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />

          {/* Timeline Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {TIMELINE_DATA.map((item) => (
              <div
                key={item.yearMonth}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  item.isHighlight
                    ? "border-[#176B52] ring-2 ring-[#176B52]/20 shadow-lg scale-105"
                    : "border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#176B52]/40"
                }`}
              >
                <div>
                  {/* Badge & YearMonth */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                        item.isHighlight
                          ? "bg-[#176B52] text-white"
                          : "bg-gray-100 text-[#176B52]"
                      }`}
                    >
                      {item.yearMonth}
                    </span>
                    {item.isHighlight && (
                      <CheckCircle2 className="w-4 h-4 text-[#176B52]" />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold leading-snug mb-2 ${
                      item.isHighlight ? "text-[#176B52]" : "text-[#222222]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-semibold text-gray-400">
                  {item.isHighlight ? "공식 출범일" : "준비 경과"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
