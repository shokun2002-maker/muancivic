"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Users, HeartHandshake } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0D4938] text-white">
      {/* Background Image Placeholder Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 mix-blend-overlay transition-opacity duration-700"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      />

      {/* Decorative Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D4938] via-[#0D4938]/60 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0D4938]/40 to-[#0D4938]" />

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10 flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2B544]/20 border border-[#F2B544]/40 text-[#F2B544] text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#F2B544] animate-pulse" />
          무안 자치주권시대의 새로운 도약
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.25] text-white mb-6">
          시민이 주인되는 무안 <br className="hidden sm:inline" />
          <span className="text-[#F2B544] drop-shadow-sm">시민의 힘으로 만들어갑니다.</span>
        </h1>

        {/* Sub Title */}
        <p className="text-base sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          참여하고, 소통하고, 행동하는 <br className="inline sm:hidden" />
          <span className="font-bold text-white underline decoration-[#176B52] decoration-4 underline-offset-4">
            무안 자치주권시민연대
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#176B52] hover:bg-[#125440] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base"
          >
            <Users className="w-5 h-5" />
            <span>시민연대 소개</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="#join"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 backdrop-blur-md shadow-md transition-all duration-200 transform hover:-translate-y-0.5 text-base"
          >
            <HeartHandshake className="w-5 h-5 text-[#F2B544]" />
            <span>함께하기</span>
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl text-left sm:text-center text-xs sm:text-sm text-gray-300">
          <div>
            <div className="font-bold text-white text-base sm:text-lg">풀뿌리 민주주의</div>
            <div className="text-gray-300/80 mt-0.5">시민 직접 참여 강화</div>
          </div>
          <div>
            <div className="font-bold text-white text-base sm:text-lg">투명한 군정감시</div>
            <div className="text-gray-300/80 mt-0.5">행정 · 예산 모니터링</div>
          </div>
          <div>
            <div className="font-bold text-white text-base sm:text-lg">지역 현안 해결</div>
            <div className="text-gray-300/80 mt-0.5">생태 · 환경 · 주권 수호</div>
          </div>
          <div>
            <div className="font-bold text-white text-base sm:text-lg">연대와 협력</div>
            <div className="text-gray-300/80 mt-0.5">지역 시민사회 연결</div>
          </div>
        </div>
      </div>
    </section>
  );
}
