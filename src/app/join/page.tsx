"use client";

import React from "react";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import { UserPlus, Users, Heart, MessageSquare, ArrowRight, HeartHandshake } from "lucide-react";

export default function JoinMainPage() {
  const cards = [
    {
      id: "membership",
      title: "회원가입",
      desc: "시민연대의 회원이 되어 무안의 주권 시대를 함께 열어가 주세요.",
      icon: <UserPlus className="w-8 h-8 text-[#176B52]" />,
      href: "/join/membership",
      actionText: "회원가입 신청하기",
    },
    {
      id: "participate",
      title: "시민참여",
      desc: "토론회, 캠페인, 자원봉사, 재능기부 등 다양한 현장에 참여해 주세요.",
      icon: <Users className="w-8 h-8 text-[#2878A7]" />,
      href: "/join/participate",
      actionText: "참여 프로그램 보기",
    },
    {
      id: "donate",
      title: "후원하기",
      desc: "독립적이고 공정한 시민활동을 위해 당당한 시민의 힘으로 후원해 주세요.",
      icon: <Heart className="w-8 h-8 text-red-500 fill-red-500/20" />,
      href: "/join/donate",
      actionText: "후원 안내 및 신청",
    },
    {
      id: "contact",
      title: "문의·제보",
      desc: "무안의 생활 현안, 행정 모니터링 제보, 시민연대에 전하고 싶은 이야기.",
      icon: <MessageSquare className="w-8 h-8 text-[#F2B544]" />,
      href: "/join/contact",
      actionText: "소중한 제보 남기기",
    },
  ];

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="함께하기"
        category="함께하기"
        subtitle="당신의 참여가 무안의 내일을 바꿉니다."
        breadcrumbItems={[{ name: "함께하기" }]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            JOIN US & PARTICIPATE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
            "당신의 참여가 무안의 내일을 바꿉니다."
          </h2>
          <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
            시민연대는 무안군민 누구에게나 열려 있습니다. 함께 걷는 시민의 발걸음이 무안의 미래가 됩니다.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="p-4 bg-[#F7F7F3] rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors mb-3">
                  {card.title}
                </h3>

                <p className="text-[#666666] text-sm leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href={card.href}
                  className="w-full py-3 px-4 bg-[#176B52]/10 group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-between"
                >
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
