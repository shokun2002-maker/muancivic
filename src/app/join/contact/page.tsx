"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, ShieldAlert, Send, Lock, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: "일반문의",
    title: "",
    content: "",
    name: "",
    contact: "",
    email: "",
    agree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    "일반문의",
    "지역현안 제보",
    "행정·정책 제보",
    "환경문제",
    "시민권익",
    "기타",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("개인정보 처리 방침에 동의해 주세요.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
      }

      // Insert inquiry row: status='접수', is_public=false (forced secret/private)
      const { error } = await supabase.from("inquiries").insert({
        type: formData.type,
        title: formData.title.trim(),
        content: formData.content.trim(),
        name: formData.name.trim(),
        phone: formData.contact.trim() || null,
        email: formData.email.trim() || null,
        status: "접수",
        is_public: false,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Contact submission error:", err);
      const errMsg =
        err instanceof Error ? err.message : "문의·제보 제출 중 오류가 발생했습니다.";
      alert(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="문의·제보"
        category="함께하기"
        subtitle="무안의 이야기를 들려주세요."
        breadcrumbItems={[
          { name: "함께하기", href: "/join" },
          { name: "문의·제보" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#176B52]/10 text-[#176B52] text-xs font-extrabold tracking-wider uppercase mb-3">
            <MessageSquare className="w-4 h-4" />
            CONTACT & INQUIRY
          </span>
          <h2 className="text-3xl font-extrabold text-[#222222]">
            무안의 이야기를 들려주세요
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-medium">
            무안에서 함께 살펴봐야 할 문제나 시민연대에 전하고 싶은 이야기가 있다면 언제든 알려주세요.
          </p>
        </div>

        {/* Security & Confidentiality Banner */}
        <div className="space-y-3 mb-10">
          <div className="bg-[#0D4938] text-white p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold shadow-md">
            <Lock className="w-5 h-5 text-[#F2B544] shrink-0" />
            <span>제보 내용은 자동으로 홈페이지에 공개되지 않으며 제보자의 익명과 신원이 철저히 보호됩니다.</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-10 border border-[#176B52] text-center space-y-4 shadow-lg">
            <CheckCircle2 className="w-16 h-16 text-[#176B52] mx-auto" />
            <h3 className="text-2xl font-extrabold text-[#222222]">
              소중한 문의·제보가 성공적으로 접수되었습니다!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              제보자의 신원과 내용은 비밀로 안전하게 보호됩니다. 담당자가 확인 후 성심껏 검토하도록 하겠습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  type: "일반문의",
                  title: "",
                  content: "",
                  name: "",
                  contact: "",
                  email: "",
                  agree: false,
                });
              }}
              className="px-6 py-2.5 bg-[#176B52] text-white font-bold text-xs rounded-xl shadow hover:bg-[#0D4938] transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          /* Contact Form Component */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                문의 / 제보 유형 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {inquiryTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.type === t
                        ? "bg-[#176B52] text-white border-[#176B52] shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="문의 또는 제보 제목을 입력해 주세요"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                제보 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="상세 내용과 발생 일시, 장소 등을 구체적으로 작성해 주시면 큰 도움이 됩니다..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  이름 / 닉네임 <span className="text-red-500">*</span>
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
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="010-0000-0000"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  이메일 주소
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="rounded text-[#176B52] focus:ring-[#176B52]"
                />
                <span>제보 조사를 위한 최소한의 개인정보 수집 및 처리방침에 동의합니다</span>
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
                  <span>제출 처리 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>문의·제보 제출하기</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
