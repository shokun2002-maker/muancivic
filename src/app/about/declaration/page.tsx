"use client";

import React from "react";
import SubHero from "@/components/SubHero";
import SubPageNav from "@/components/SubPageNav";
import { DECLARATION_DATA } from "@/data/declaration";
import { Quote, Sparkles, BookOpen } from "lucide-react";

export default function DeclarationPage() {
  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={DECLARATION_DATA.pageTitle}
        category={DECLARATION_DATA.category}
        subtitle={DECLARATION_DATA.highlightQuote}
        breadcrumbItems={[
          { name: "시민연대 소개", href: "/about/greeting" },
          { name: DECLARATION_DATA.pageTitle },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Banner Quote Card */}
        <div className="bg-[#0D4938] text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Quote className="w-48 h-48 text-white" />
          </div>
          <div className="relative z-10 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2B544] text-[#0D4938] text-xs font-extrabold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              창립 선언 핵심 명제
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-snug tracking-tight text-white">
              "{DECLARATION_DATA.highlightQuote}"
            </h2>
          </div>
        </div>

        {/* Preamble Text */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-16 space-y-4 text-base sm:text-lg text-[#222222] leading-relaxed">
          <h3 className="text-xs font-extrabold text-[#176B52] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            전문 (PREAMBLE)
          </h3>
          {DECLARATION_DATA.preamble.map((p, idx) => (
            <p key={idx} className="border-l-2 border-[#176B52]/30 pl-4 py-1">
              {p}
            </p>
          ))}
        </div>

        {/* 5 Declarations - Independent Sections with Large Numbers 01, 02, 03, 04, 05 */}
        <div className="space-y-12 mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block mb-1">
              5 GREAT DECLARATIONS
            </span>
            <h3 className="text-2xl font-extrabold text-[#222222]">
              무안 자치주권시민연대 5대 창립 선언
            </h3>
          </div>

          {DECLARATION_DATA.articles.map((art) => (
            <div
              key={art.num}
              id={`decl-${art.num}`}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              {/* Large Number Watermark */}
              <div className="absolute top-2 right-4 text-6xl sm:text-8xl font-black text-gray-100/80 select-none pointer-events-none font-mono">
                {art.num}
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#176B52] text-white text-xs font-bold rounded-lg mb-4">
                  <span>선언</span>
                  <span className="font-mono">{art.num}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-[#222222] leading-snug mb-6">
                  {art.title}
                </h4>

                <div className="space-y-3 pt-4 border-t border-gray-100 text-sm sm:text-base text-[#444444] leading-relaxed">
                  {art.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#176B52] mt-2.5 shrink-0" />
                      <span>{p}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Declaration */}
        <div className="bg-[#176B52]/10 rounded-3xl p-8 sm:p-10 border border-[#176B52]/30 text-center space-y-3 mb-12">
          {DECLARATION_DATA.closing.map((c, idx) => (
            <p key={idx} className="text-base sm:text-xl font-bold text-[#0D4938]">
              {c}
            </p>
          ))}
        </div>

        {/* Date & Sign-off */}
        <div className="text-center space-y-2 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-500">{DECLARATION_DATA.date}</p>
          <p className="text-lg font-bold text-[#176B52]">{DECLARATION_DATA.signOff}</p>
        </div>

        {/* Subpage Nav */}
        <SubPageNav currentId="declaration" />
      </div>
    </div>
  );
}
