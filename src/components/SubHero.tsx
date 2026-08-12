import React from "react";
import Breadcrumb from "./Breadcrumb";

interface SubHeroProps {
  title: string;
  category?: string;
  subtitle?: string;
  breadcrumbItems: { name: string; href?: string }[];
}

export default function SubHero({
  title,
  category = "시민연대 소개",
  subtitle = "시민이 주인되는 무안을 만들어갑니다.",
  breadcrumbItems,
}: SubHeroProps) {
  return (
    <div className="bg-[#0D4938] text-white relative overflow-hidden py-12 sm:py-16">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D4938] via-[#176B52] to-[#0D4938] opacity-90" />
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Category Badge & Titles */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B544]/20 border border-[#F2B544]/40 text-[#F2B544] text-xs font-bold tracking-wide mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B544]" />
            {category}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-emerald-100 text-sm sm:text-base mt-3 font-medium max-w-2xl">
              "{subtitle}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
