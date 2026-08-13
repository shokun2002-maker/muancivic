"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUp, Info } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSnsClick = (name: string) => {
    alert(`무안 자치주권시민연대 공식 ${name} 채널 개설 준비 중입니다.`);
  };

  return (
    <footer className="bg-[#0D4938] text-gray-300 pt-16 pb-12 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/60">
          {/* Brand Info & Notice (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-auto">
                <Image
                  src="/logo.png"
                  alt="무안 자치주권시민연대 로고"
                  width={140}
                  height={42}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div>
                <span className="font-bold text-xl text-white block">무안 자치주권시민연대</span>
                <span className="text-[10px] text-emerald-200 tracking-wider uppercase">
                  Muan Civic Sovereignty Alliance
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              시민이 참여하고 시민이 결정하는 무안, 지역 자치주권 수호와 민주적 공동체 발전을 위해 함께 행동합니다.
            </p>

            {/* Operating Contact Notice */}
            <div className="space-y-1.5 text-xs text-emerald-200/90 pt-2 font-mono">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#F2B544] shrink-0" />
                <span>대표 연락처 및 사무실 주소 안내는 정식 개소 일정에 맞춰 공지됩니다.</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300/80 text-[11px]">
                <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>1:1 문의 및 비밀제보는 [함께하기 &gt; 문의·제보] 메뉴를 이용해 주세요.</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-4">
                주요 안내
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/about/greeting" className="hover:text-white transition-colors">
                    시민연대 소개
                  </Link>
                </li>
                <li>
                  <Link href="/issues/current" className="hover:text-white transition-colors">
                    무안 주요 현안
                  </Link>
                </li>
                <li>
                  <Link href="/issues/voices" className="hover:text-white transition-colors">
                    시민의 목소리
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:text-white transition-colors">
                    함께하기 (회원/후원)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-4">
                약관 및 정책
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/privacy" className="hover:text-white font-semibold">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/join/contact" className="hover:text-white transition-colors">
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link href="/about/declaration" className="hover:text-white transition-colors">
                    창립선언문
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* SNS Icons & Scroll Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-4 md:text-right">
                소통 채널 (SNS)
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSnsClick("네이버 블로그")}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-[#F2B544] hover:text-[#0D4938] text-white transition-colors text-xs font-bold"
                  title="공식 블로그 준비 중"
                >
                  블로그
                </button>
                <button
                  type="button"
                  onClick={() => handleSnsClick("유튜브")}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-[#F2B544] hover:text-[#0D4938] text-white transition-colors text-xs font-bold"
                  title="공식 유튜브 준비 중"
                >
                  유튜브
                </button>
                <button
                  type="button"
                  onClick={() => handleSnsClick("페이스북")}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-[#F2B544] hover:text-[#0D4938] text-white transition-colors text-xs font-bold"
                  title="공식 페이스북 준비 중"
                >
                  FB
                </button>
                <button
                  type="button"
                  onClick={() => handleSnsClick("카카오톡")}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-[#F2B544] hover:text-[#0D4938] text-white transition-colors text-xs font-bold"
                  title="공식 카카오톡 채널 준비 중"
                >
                  카카오
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800/60 hover:bg-emerald-700 text-xs font-semibold rounded-lg text-emerald-100 transition-colors"
            >
              <span>맨 위로 스크롤</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-200/60 gap-4">
          <p>© 2026 무안 자치주권시민연대. All rights reserved.</p>
          <p>본 사이트는 시민주권 수호를 위한 비영리 독자 운영 플랫폼입니다.</p>
        </div>
      </div>
    </footer>
  );
}
