"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import CategoryBadge from "@/components/CategoryBadge";
import { getLatestStatements } from "@/lib/data/posts";
import type { StatementPost } from "@/data/statements";
import { FileText, Calendar, ChevronRight, AlertCircle } from "lucide-react";

export default function StatementsListPage() {
  const [statements, setStatements] = useState<StatementPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getLatestStatements();
        setStatements(data);
      } catch (err) {
        console.error("Failed to load statements:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading...</p>;
  }

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="시민연대 소식"
        category="시민연대 소식"
        subtitle="시민이 움직이면 무안이 달라집니다."
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "성명·논평" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" />
              STATEMENTS &amp; COMMENTARIES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              성명·논평
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              지역 현안에 대한 시민연대의 생각과 입장을 전합니다.
            </p>
          </div>
        </div>

        {/* Disclaimer Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-10 flex items-center justify-between text-xs font-bold text-amber-800">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              안내: 아래 성명·논평은 홈페이지 시연용 예시 콘텐츠이며 실제 공식 성명이 아닙니다.
            </span>
          </div>
          <span className="bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded text-[10px]">
            시연용 예시
          </span>
        </div>

        {/* Statements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {statements.map((item) => (
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
                <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href={`/news/statements/${item.slug}`}
                  className="w-full py-2.5 px-4 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-between"
                >
                  <span>성명 전문 읽기</span>
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
