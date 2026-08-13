"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import { createClient } from "@/lib/supabase/client";
import { UserPlus, ShieldCheck, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    memberType: "정회원",
    interest: "지방자치",
    motive: "",
    privacyAgree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgree) {
      alert("개인정보 수집 및 이용 안내에 동의해 주세요.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
      }

      // Insert member profile: status='대기', auth_user_id=null, joined_at=null for public application
      const { error } = await supabase.from("member_profiles").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        region: formData.address.trim() || null,
        member_type: formData.memberType as "정회원" | "준회원" | "후원회원",
        status: "대기",
        auth_user_id: null,
        joined_at: null,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Membership application error:", err);
      const errMsg =
        err instanceof Error ? err.message : "가입 신청 중 오류가 발생했습니다.";
      alert(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestsList = [
    "지방자치",
    "환경",
    "복지",
    "청년",
    "여성",
    "농어업",
    "문화예술",
    "다문화·인권",
    "기타",
  ];

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="회원가입"
        category="함께하기"
        subtitle="시민이 참여할 때 무안이 달라집니다."
        breadcrumbItems={[
          { name: "함께하기", href: "/join" },
          { name: "회원가입" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#176B52]/10 text-[#176B52] text-xs font-extrabold tracking-wider uppercase mb-3">
            <UserPlus className="w-4 h-4" />
            BECOME A MEMBER
          </span>
          <h2 className="text-3xl font-extrabold text-[#222222]">
            시민연대와 함께해주세요
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-medium">
            시민의 자발적 참여가 무안의 주권 시대를 여는 위대한 첫걸음입니다.
          </p>
        </div>

        {/* 1. Membership Types Intro Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="inline-block px-3 py-1 bg-[#176B52] text-white text-xs font-bold rounded-lg mb-3">
              정회원
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              본 연대의 정관 및 취지에 동의하고 회비를 납부하며, 정기총회 의결권과 선거권을 갖는 주체적인 회원입니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="inline-block px-3 py-1 bg-[#2878A7] text-white text-xs font-bold rounded-lg mb-3">
              준회원
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              시민연대의 활동에 동의하고 토론회, 캠페인, 봉사 활동 등 다양한 시민 행사에 직접 소통하며 참여하는 회원입니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="inline-block px-3 py-1 bg-[#F2B544] text-[#0D4938] text-xs font-bold rounded-lg mb-3">
              후원회원
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              독립적인 공익 시민활동을 위해 정기적 또는 일시적으로 후원금을 통해 재정적 든든한 버팀목이 되어 주시는 회원입니다.
            </p>
          </div>
        </div>

        {/* Submitted Success Box */}
        {submitted ? (
          <div className="bg-white rounded-3xl p-10 border border-[#176B52] text-center space-y-4 shadow-lg">
            <CheckCircle2 className="w-16 h-16 text-[#176B52] mx-auto" />
            <h3 className="text-2xl font-extrabold text-[#222222]">
              회원가입 신청이 성공적으로 접수되었습니다!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              시민연대 회원으로 가입해 주셔서 감사드립니다. 담당자 승인 검토 후 안내 연락을 드리겠습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  memberType: "정회원",
                  interest: "지방자치",
                  motive: "",
                  privacyAgree: false,
                });
              }}
              className="px-6 py-2.5 bg-[#176B52] text-white font-bold text-xs rounded-xl shadow hover:bg-[#0D4938] transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          /* Form Component */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#222222] pb-3 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#176B52]" />
              회원가입 신청서 작성
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  휴대전화 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  이메일 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  주소 또는 거주지역 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="무안군 무안읍 / 삼향읍 남악리 등"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                회원유형 선택 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["정회원", "준회원", "후원회원"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, memberType: type })}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.memberType === type
                        ? "bg-[#176B52] text-white border-[#176B52] shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                관심 분야
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              >
                {interestsList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                가입 동기 및 제안사항
              </label>
              <textarea
                rows={3}
                placeholder="시민연대에 가입하게 된 동기나 바라는 점을 적어주세요..."
                value={formData.motive}
                onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyAgree}
                  onChange={(e) => setFormData({ ...formData, privacyAgree: e.target.checked })}
                  className="rounded text-[#176B52] focus:ring-[#176B52]"
                />
                <span>개인정보 수집 및 이용 안내에 동의합니다.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>신청서 제출 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>회원가입 신청서 제출하기</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
