"use client";

import React from "react";
import Link from "next/link";
import { JOIN_US_CARDS } from "@/data/mockData";
import { UserPlus, Users, Heart, MessageSquare, ArrowRight, HeartHandshake } from "lucide-react";

export default function JoinUsSection() {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case "UserPlus":
        return <UserPlus className="w-7 h-7 text-[#176B52]" />;
      case "Users":
        return <Users className="w-7 h-7 text-[#2878A7]" />;
      case "Heart":
        return <Heart className="w-7 h-7 text-red-500 fill-red-500/20" />;
      default:
        return <MessageSquare className="w-7 h-7 text-[#F2B544]" />;
    }
  };

  return (
    <section id="join" className="py-16 sm:py-24 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            PARTICIPATE & JOIN US
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            함께하기
          </h2>
          <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
            당신의 참여가 무안의 내일을 바꿉니다.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {JOIN_US_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="p-4 bg-[#F7F7F3] rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  {getCardIcon(card.iconName)}
                </div>

                <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors mb-3">
                  {card.title}
                </h3>

                <p className="text-[#666666] text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href={card.href}
                  className="w-full py-2.5 px-4 bg-[#176B52]/10 hover:bg-[#176B52] text-[#176B52] hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-between"
                >
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
