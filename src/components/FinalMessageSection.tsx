"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function FinalMessageSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#176B52] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-at-c from-white/10 to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-[#F2B544] mb-6 backdrop-blur-sm">
          <Heart className="w-6 h-6 fill-[#F2B544]" />
        </div>

        {/* Big Main Message Banner */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.25] text-white mb-6">
          "무안의 진짜 주인은 <br className="hidden sm:inline" />
          <span className="text-[#F2B544]">무안군민입니다.</span>"
        </h2>

        {/* Sub Message */}
        <p className="text-base sm:text-xl text-emerald-100 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
          시민이 참여하고 시민이 결정하는 무안, <br className="hidden sm:inline" />
          무안 자치주권시민연대가 함께하겠습니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/join"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#F2B544] text-[#0D4938] font-extrabold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span>지금 시민참여 시작하기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
