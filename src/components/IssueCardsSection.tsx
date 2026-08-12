"use client";

import React from "react";
import Link from "next/link";
import { MOCK_ISSUES } from "@/data/mockData";
import { ChevronRight, AlertCircle, ShieldCheck, Activity, Compass } from "lucide-react";

export default function IssueCardsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "군정 · 안보":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "환경 · 주민보건":
        return <ShieldCheck className="w-4 h-4 text-amber-600" />;
      case "안전 · 주거환경":
        return <Activity className="w-4 h-4 text-blue-600" />;
      default:
        return <Compass className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section id="issues" className="py-16 sm:py-24 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#176B52]" />
              MUAN KEY ISSUES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              지금 무안에서는
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
              우리가 함께 살펴봐야 할 무안의 이야기
            </p>
          </div>
          <Link
            href="#issues-all"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#176B52] hover:text-[#0D4938] group"
          >
            <span>전체 현안 살펴보기</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Issue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {MOCK_ISSUES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category & Status Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                    {getCategoryIcon(item.category)}
                    {item.category}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${item.statusBadgeColor}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                {/* Card Short Description */}
                <p className="text-[#666666] text-sm leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>
              </div>

              {/* Action / Learn More */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#176B52] group-hover:text-[#0D4938]">
                <span>자세히 보기</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
