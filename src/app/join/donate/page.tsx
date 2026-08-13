"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import { createClient } from "@/lib/supabase/client";
import { Heart, ShieldAlert, CheckCircle2, CreditCard, Landmark, Loader2, X } from "lucide-react";

export default function DonatePage() {
  const [donateType, setDonateType] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState<number>(20000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const presetAmounts = [10000, 20000, 30000, 50000];

  const getFinalAmount = (): number => {
    if (isCustom) {
      return Number(customAmount) || 0;
    }
    return amount;
  };

  const handleOpenModal = () => {
    const finalAmt = getFinalAmount();
    if (finalAmt <= 0) {
      alert("올바른 후원 금액을 입력해 주세요.");
      return;
    }
    setModalOpen(true);
  };

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert("후원자 성명을 입력해 주세요.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
      }

      const finalAmt = getFinalAmount();
      const { error } = await supabase.from("donations").insert({
        donor_name: donorName.trim(),
        donation_type: donateType === "monthly" ? "정기후원" : "일시후원",
        amount: finalAmt,
        status: "신청",
      });

      if (error) throw error;

      setModalOpen(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Donation submission error:", err);
      const errMsg =
        err instanceof Error ? err.message : "후원 신청 중 오류가 발생했습니다.";
      alert(errMsg);
    } finally {
      setIsSubmitting(false);
    }
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

        {submitted ? (
          <div className="bg-white rounded-3xl p-10 border border-[#176B52] text-center space-y-4 shadow-lg">
            <CheckCircle2 className="w-16 h-16 text-[#176B52] mx-auto" />
            <h3 className="text-2xl font-extrabold text-[#222222]">
              소중한 후원 약정 신청이 접수되었습니다!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              시민연대 후원 약정에 참여해 주셔서 진심으로 감사드립니다. 담당자 확인 후 안내 연락을 드리겠습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setDonorName("");
              }}
              className="px-6 py-2.5 bg-[#176B52] text-white font-bold text-xs rounded-xl shadow hover:bg-[#0D4938] transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          /* 2. Donation Form Box */
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
                onClick={handleOpenModal}
                className="w-full py-4 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-base rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>
                  {donateType === "monthly" ? "정기후원" : "일시후원"}{" "}
                  {getFinalAmount() > 0
                    ? `${getFinalAmount().toLocaleString()}원`
                    : "금액미정"}{" "}
                  약정 신청하기
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Donor Information Input Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-extrabold text-gray-900">
                후원자 정보 입력
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitDonation} className="space-y-4">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs font-semibold text-rose-800">
                신청 내용: {donateType === "monthly" ? "정기후원" : "일시후원"} /{" "}
                {getFinalAmount().toLocaleString()}원
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  후원자 성명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>신청 중...</span>
                    </>
                  ) : (
                    <span>후원 약정 신청완료</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
