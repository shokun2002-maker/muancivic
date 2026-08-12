"use client";

import React from "react";
import Link from "next/link";
import { MONITORING_CARDS } from "@/data/mockData";
import { Eye, FileCheck, ArrowRight, PieChart, LandPlot, Scale } from "lucide-react";

export default function MonitoringSection() {
  const getCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return <LandPlot className="w-6 h-6 text-[#176B52]" />;
      case 1:
        return <Scale className="w-6 h-6 text-[#2878A7]" />;
      default:
        return <PieChart className="w-6 h-6 text-[#F2B544]" />;
    }
  };

  const getSlugByIndex = (index: number) => {
    switch (index) {
      case 0:
        return "2026-policy";
      case 1:
        return "council-monitoring";
      default:
        return "budget-analysis";
    }
  };

  return (
    <section id="monitoring" className="py-16 sm:py-24 bg-white border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
            <Eye className="w-3.5 h-3.5" />
            POLICY & GOVERNANCE MONITORING
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            시민연대가 바라보는 무안
          </h2>
          <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
            "감시하되 비난에 머물지 않고, 문제를 지적하되 대안을 제시합니다."
          </p>
        </div>

        {/* 3 Monitoring Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MONITORING_CARDS.map((card, idx) => {
            const slug = getSlugByIndex(idx);
            return (
              <div
                key={card.id}
                className="bg-[#F7F7F3] rounded-3xl p-8 border border-gray-200/80 hover:bg-white hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                      {getCardIcon(idx)}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-[#176B52]/10 text-[#176B52] rounded-full">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                    {card.title}
                  </h3>

                  <p className="text-[#666666] text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/60">
                  <Link
                    href={`/issues/monitoring/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] group-hover:text-[#0D4938]"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>리포트 자세히 확인</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
