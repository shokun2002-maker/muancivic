"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import { Heart, ShieldAlert, CheckCircle2, CreditCard, Landmark } from "lucide-react";

export default function DonatePage() {
  const [donateType, setDonateType] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState<number>(20000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [10000, 20000, 30000, 50000];

  const handleDonateSample = () => {
    alert("후원 신청 시연 안내: 현재는 UI 시연 단계이며 실제 결제는 연결되어 있지 않습니다. 추후 PG 전자결제 및 계좌 연결 시 정식 운영됩니다.");
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="후원하기"
        category="함께하기"
        subtitle="시민의 힘으로 시민연대를 응원해주세요."
        breadcrumbItems={[
          { name: "함께하기", href: "/join" },
          { name: "후원하기" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-extrabold tracking-wider uppercase mb-3">
            <Heart className="w-4 h-4 fill-rose-500" />
            SUPPORT CIVIC ALLIANCE
          </span>
          <h2 className="text-3xl font-extrabold text-[#222222]">
            시민의 힘으로 시민연대를 응원해주세요
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-medium">
            독립적인 시민활동은 정당이나 행정의 지원이 아닌 오직 시민의 자발적 참여와 후원으로 만들어집니다.
          </p>
        </div>

        {/* 1. Donation Usage Area Guide */}
        <div className="bg-[#0D4938] text-white rounded-3xl p-8 sm:p-10 mb-12 shadow-xl">
          <h3 className="text-lg font-bold text-[#F2B544] mb-4 flex items-center gap-2">
            <Landmark className="w-5 h-5" />
            소중한 후원금은 이렇게 사용됩니다
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-emerald-100 font-medium">
            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F2B544] shrink-0" />
              <span>지역 현안 현장 조사</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F2B544] shrink-0" />
              <span>정책 연구 및 보고서</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F2B544] shrink-0" />
              <span>주민 자치 시민 교육</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F2B544] shrink-0" />
              <span>시민 공론 토론회</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F2B544] shrink-0" />
              <span>환경·생존권 캠페인</span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F2B544] shrink-0" />
              <span>시민연대 독립 운영</span>
            </div>
          </div>
        </div>

        {/* 2. Donation Form Simulator Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm space-y-8">
          {/* Donation Type Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-3">
              1. 후원 방식 선택
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDonateType("monthly")}
                className={`py-4 px-4 rounded-2xl font-extrabold text-sm transition-all border ${
                  donateType === "monthly"
                    ? "bg-[#176B52] text-white border-[#176B52] shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                정기후원 (매월 자동후원)
              </button>
              <button
                type="button"
                onClick={() => setDonateType("once")}
                className={`py-4 px-4 rounded-2xl font-extrabold text-sm transition-all border ${
                  donateType === "once"
                    ? "bg-[#176B52] text-white border-[#176B52] shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                일시후원 (1회 후원)
              </button>
            </div>
          </div>

          {/* Amount Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-3">
              2. 후원 금액 선택
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setIsCustom(false);
                  }}
                  className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                    !isCustom && amount === amt
                      ? "bg-[#F2B544] text-[#0D4938] border-[#F2B544] shadow"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {amt.toLocaleString()}원
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isCustom
                    ? "bg-[#F2B544] text-[#0D4938] border-[#F2B544] shadow"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                직접입력
              </button>
            </div>

            {isCustom && (
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="후원하실 금액을 입력해 주세요 (원)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <button
              type="button"
              onClick={handleDonateSample}
              className="w-full py-4 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-base rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>
                {donateType === "monthly" ? "정기후원" : "일시후원"}{" "}
                {isCustom ? (customAmount ? `${Number(customAmount).toLocaleString()}원` : "금액미정") : `${amount.toLocaleString()}원`} 신청하기 (시연)
              </span>
            </button>

            <p className="text-center text-xs font-bold text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>현재는 후원 UI 시연 화면이며 실제 결제는 이루어지지 않습니다.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
