"use client";

import React from "react";
import SubHero from "@/components/SubHero";
import SubPageNav from "@/components/SubPageNav";
import { GREETING_DATA } from "@/data/greeting";
import { ShieldAlert, Users, Trees, Heart, Handshake, Quote } from "lucide-react";

export default function GreetingPage() {
  const getDirectionIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-[#176B52]" />;
      case "Users":
        return <Users className="w-6 h-6 text-[#2878A7]" />;
      case "Trees":
        return <Trees className="w-6 h-6 text-emerald-600" />;
      case "Heart":
        return <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20" />;
      default:
        return <Handshake className="w-6 h-6 text-[#F2B544]" />;
    }
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={GREETING_DATA.pageTitle}
        category={GREETING_DATA.category}
        subtitle={GREETING_DATA.highlightQuote}
        breadcrumbItems={[
          { name: "시민연대 소개", href: "/about/greeting" },
          { name: GREETING_DATA.pageTitle },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Highlight Banner Quote Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200/80 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-[#176B52]">
            <Quote className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <span className="inline-block text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full mb-3">
              환영 메시지
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-snug">
              "{GREETING_DATA.highlightQuote}"
            </h2>
          </div>
        </div>

        {/* Intro Paragraphs with Ample Spacing */}
        <div className="space-y-6 text-[#222222] text-base sm:text-lg leading-relaxed font-normal">
          {GREETING_DATA.paragraphs.map((p, idx) => (
            <p key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs">
              {p}
            </p>
          ))}
        </div>

        {/* 5 Core Directions - Expressed as Separate Cards (Not Bullet Points) */}
        <div className="my-14">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block mb-1">
              OUR 5 CORE PATHS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
              군민 여러분과 함께 걸어갈 5가지 실천 약속
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GREETING_DATA.coreDirections.map((item, idx) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
                  idx === 0 ? "md:col-span-2 border-[#176B52]/40 bg-gradient-to-r from-white to-[#176B52]/5" : "border-gray-200/80"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F7F7F3] rounded-xl shrink-0">
                    {getDirectionIcon(item.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-[#176B52]">0{idx + 1}</span>
                      <h4 className="text-lg font-bold text-[#222222]">{item.title}</h4>
                    </div>
                    <p className="text-sm text-[#666666] leading-relaxed mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Paragraphs */}
        <div className="space-y-6 text-[#222222] text-base sm:text-lg leading-relaxed font-normal">
          {GREETING_DATA.closingParagraphs.map((p, idx) => (
            <p key={idx} className="bg-[#176B52]/5 p-6 sm:p-8 rounded-2xl border border-[#176B52]/20 font-medium">
              {p}
            </p>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-12 text-right pt-6 border-t border-gray-200">
          <p className="text-base sm:text-lg font-bold text-[#176B52]">{GREETING_DATA.signOff}</p>
        </div>

        {/* Subpage Nav */}
        <SubPageNav currentId="greeting" />
      </div>
    </div>
  );
}
