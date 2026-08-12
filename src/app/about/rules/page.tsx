"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import SubPageNav from "@/components/SubPageNav";
import { RULES_DATA, RULES_CHAPTERS_NAV } from "@/data/rules";
import { BookMarked, ChevronDown, ListFilter, Scale } from "lucide-react";

export default function RulesPage() {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileTocOpen(false);
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="정관"
        category="시민연대 소개"
        subtitle="무안 자치주권시민연대의 민주적 운영 규약과 성문 법칙"
        breadcrumbItems={[
          { name: "시민연대 소개", href: "/about/greeting" },
          { name: "정관" },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Table of Contents - Desktop Pills & Mobile Dropdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80 mb-12 sticky top-20 z-30 backdrop-blur-md bg-white/95">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider">
              <BookMarked className="w-4 h-4" />
              TABLE OF CONTENTS (정관 목차)
            </div>

            {/* Mobile TOC Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#176B52]/10 text-[#176B52] font-bold text-xs rounded-lg"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>목차 선택</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileTocOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Desktop Table of Contents Pills */}
          <div className="hidden md:flex flex-wrap gap-2">
            {RULES_CHAPTERS_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToChapter(item.id)}
                className="px-3.5 py-2 bg-[#F7F7F3] hover:bg-[#176B52] hover:text-white text-xs font-bold text-[#222222] rounded-xl transition-all duration-200 border border-gray-200/80"
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Mobile Table of Contents Accordion / List */}
          {mobileTocOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto">
              {RULES_CHAPTERS_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToChapter(item.id)}
                  className="text-left px-3 py-2 bg-gray-50 hover:bg-[#176B52]/10 text-xs font-semibold text-[#222222] rounded-lg transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rules Chapters List */}
        <div className="space-y-12 mb-16">
          {RULES_DATA.map((chap) => (
            <div
              key={chap.id}
              id={chap.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm scroll-mt-28"
            >
              {/* Chapter Header */}
              <div className="flex items-center gap-3 pb-4 border-b-2 border-[#176B52] mb-6">
                <div className="p-2 bg-[#176B52]/10 rounded-xl text-[#176B52]">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
                  {chap.chapterTitle}
                </h2>
              </div>

              {/* Articles in Chapter */}
              <div className="space-y-8">
                {chap.articles.map((art) => (
                  <div key={art.id} className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#176B52] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#176B52]" />
                      {art.title}
                    </h3>

                    <div className="pl-4 space-y-2 text-sm sm:text-base text-[#333333] leading-relaxed">
                      {art.content.map((line, lIdx) => (
                        <p key={lIdx} className="whitespace-pre-wrap">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Subpage Nav */}
        <SubPageNav currentId="rules" />
      </div>
    </div>
  );
}
