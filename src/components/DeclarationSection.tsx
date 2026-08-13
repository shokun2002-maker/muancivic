"use client";

import React from "react";
import Link from "next/link";
import { Quote, ArrowRight, BookOpen } from "lucide-react";

export default function DeclarationSection() {
  return (
    <section id="declaration" className="py-20 sm:py-28 bg-[#0D4938] text-white relative overflow-hidden">
      {/* Background Graphic Patterns */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10 pointer-events-none">
        <div className="w-96 h-96 rounded-full border-[32px] border-white" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-10 pointer-events-none">
        <div className="w-80 h-80 rounded-full border-[24px] border-[#F2B544]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Quote Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#176B52] text-[#F2B544] mb-8 shadow-inner border border-emerald-600/50">
          <Quote className="w-8 h-8" />
        </div>

        {/* Big Quote Main Banner Text */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.3] sm:leading-[1.35] text-white mb-8">
          "시민은 지역의 미래를 <br className="hidden sm:inline" />
          <span className="text-[#F2B544]">스스로 결정하는 주권자입니다.</span>"
        </h2>

        {/* Sub Text */}
        <p className="text-base sm:text-xl text-emerald-100 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
          우리는 시민의 참여와 연대의 힘으로 <br className="hidden sm:inline" />
          더 정의롭고 공정한 지역사회를 만들기 위해 행동합니다.
        </p>

        {/* Button */}
        <Link
          href="/about/declaration"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2B544] hover:bg-[#e0a435] text-[#0D4938] font-extrabold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <BookOpen className="w-5 h-5" />
          <span>창립선언문 전문 보기</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </section>
  );
}
