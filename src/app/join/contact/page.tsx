"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import { MessageSquare, ShieldAlert, Send, Lock, Paperclip, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: "일반문의",
    title: "",
    content: "",
    name: "",
    contact: "",
    email: "",
    fileName: "",
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    "일반문의",
    "지역현안 제보",
    "행정·정책 제보",
    "환경문제",
    "시민권익",
    "기타",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("개인정보 처리 방침에 동의해 주세요.");
      return;
    }
    setSubmitted(true);
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

        {/* Security & Confidentiality Banners (MANDATORY FROM PROMPT) */}
        <div className="space-y-3 mb-10">
          <div className="bg-[#0D4938] text-white p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold shadow-md">
            <Lock className="w-5 h-5 text-[#F2B544] shrink-0" />
            <span>제보 내용은 자동으로 홈페이지에 공개되지 않으며 제보자의 익명과 신원이 철저히 보호됩니다.</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs font-bold text-amber-800">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>현재는 UI 시연 단계로 작성된 내용은 실제 전송되지 않습니다.</span>
            </div>
            <span className="bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded text-[10px]">
              시연 단계
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-10 border border-[#176B52] text-center space-y-4 shadow-lg">
            <CheckCircle2 className="w-16 h-16 text-[#176B52] mx-auto" />
            <h3 className="text-2xl font-extrabold text-[#222222]">
              제보 작성 시연이 완료되었습니다!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              제보 전송 시연이 완료되었습니다. 추후 실제 메일 서버 및 1:1 비밀 제보 시스템 연동 시 안전한 보안 채널로 작동합니다.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-[#176B52] text-white font-bold text-xs rounded-xl shadow"
            >
              다시 작성 시연하기
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

            {/* File Attachment UI (Sample) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                증빙 사진 및 파일 첨부 (선택)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  placeholder={formData.fileName || "첨부할 문서나 사진 파일 (시연 UI)"}
                  className="flex-1 px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, fileName: "샘플_현장_사진.jpg" });
                    alert("샘플 파일 첨부 선택 완료");
                  }}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>파일 찾기</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="rounded text-[#176B52] focus:ring-[#176B52]"
                />
                <span>제보 조사를 위한 최소한의 개인정보 수집 및 처리방침에 동의합니다</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>문의·제보 제출하기 (시연)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
