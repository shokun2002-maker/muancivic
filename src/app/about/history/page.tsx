"use client";

import React from "react";
import SubHero from "@/components/SubHero";
import SubPageNav from "@/components/SubPageNav";
import { HISTORY_DATA } from "@/data/history";
import { Calendar, CheckCircle2, History, Flag } from "lucide-react";

export default function HistoryPage() {
  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={HISTORY_DATA.pageTitle}
        category={HISTORY_DATA.category}
        subtitle={HISTORY_DATA.highlightQuote}
        breadcrumbItems={[
          { name: "시민연대 소개", href: "/about/greeting" },
          { name: HISTORY_DATA.pageTitle },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Intro Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#176B52]/10 text-[#176B52] text-xs font-extrabold tracking-wider uppercase mb-3">
            <History className="w-3.5 h-3.5" />
            CHRONOLOGICAL TIMELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">
            시민연대의 발자취와 역사적 순간들
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-medium">
            2025년 4월 첫 창립 결의부터 2026년 7월 24일 공식 출범까지의 경과입니다.
          </p>
        </div>

        {/* Timeline Component: PC Alternating Left/Right + Mobile Single Column */}
        <div className="relative">
          {/* Vertical Line Line Center (PC) / Left (Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gray-200 md:-translate-x-1/2 rounded-full" />

          <div className="space-y-12 relative z-10">
            {HISTORY_DATA.timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isHighlight = item.isHighlight;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left or Right Content Box (PC) / Content Box (Mobile) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                    <div
                      className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                        isHighlight
                          ? "bg-[#176B52] text-white border-[#0D4938] shadow-xl scale-105"
                          : "bg-white text-[#222222] border-gray-200/80 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full ${
                            isHighlight
                              ? "bg-[#F2B544] text-[#0D4938]"
                              : "bg-[#176B52]/10 text-[#176B52]"
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {item.dateStr}
                        </span>
                        {isHighlight && (
                          <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            공식 출범
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-lg sm:text-xl font-extrabold leading-snug mb-2 ${
                          isHighlight ? "text-white" : "text-[#222222]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.detail && (
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isHighlight ? "text-emerald-100" : "text-[#666666]"
                          }`}
                        >
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center Node Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center z-20 my-2 sm:my-0"
                    style={{
                      backgroundColor: isHighlight ? "#F2B544" : "#176B52",
                      color: isHighlight ? "#0D4938" : "#ffffff",
                    }}
                  >
                    {isHighlight ? (
                      <Flag className="w-4 h-4 fill-current" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>

                  {/* Spacer for 1/2 Grid on PC */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Subpage Nav */}
        <SubPageNav currentId="history" />
      </div>
    </div>
  );
}
