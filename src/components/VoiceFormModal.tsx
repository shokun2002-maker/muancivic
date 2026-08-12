"use client";

import React, { useState } from "react";
import { X, AlertCircle, Send, MessageSquarePlus } from "lucide-react";
import { VOICE_CATEGORIES } from "@/data/voices";

interface VoiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceFormModal({ isOpen, onClose }: VoiceFormModalProps) {
  const [formData, setFormData] = useState({
    category: "교통",
    title: "",
    content: "",
    author: "",
    contact: "",
    isPublic: "true",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "시민의 목소리가 등록 시연되었습니다! (현재는 UI 시연 단계로 DB에 저장되지는 않으며, 추후 Supabase 연동 시 정상 반영됩니다)"
    );
    onClose();
  };

  const categories = VOICE_CATEGORIES.filter((c) => c !== "전체");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 my-8">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F7F7F3]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#176B52]/10 text-[#176B52] rounded-xl">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#222222]">시민의 목소리 남기기</h3>
              <p className="text-[11px] text-[#666666]">무안의 변화를 위한 소중한 제안을 들려주세요</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Notice Banner (REQUIRED BY PROMPT) */}
        <div className="bg-amber-50 border-b border-amber-200/80 p-4 text-xs font-bold text-amber-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            현재는 홈페이지 UI 시연 단계이며 제출 기능은 아직 연결되지 않았습니다.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              분야 선택 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              제안 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="예: 남악·오룡 버스 노선 개선을 제안합니다"
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              제안 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="무안군의 문제점이나 개선이 필요한 사항을 자세히 적어주세요..."
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                이름 / 닉네임 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="홍길동"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                연락처 (이메일/전화번호)
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="010-0000-0000"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              공개 여부
            </label>
            <div className="flex items-center gap-4 text-xs font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="isPublic"
                  value="true"
                  checked={formData.isPublic === "true"}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.value })}
                  className="text-[#176B52] focus:ring-[#176B52]"
                />
                <span>공개 (모든 시민에게 노출)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="isPublic"
                  value="false"
                  checked={formData.isPublic === "false"}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.value })}
                  className="text-[#176B52] focus:ring-[#176B52]"
                />
                <span>비공개 (시민연대 담당자만 확인)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>시민의 목소리 등록하기 (시연)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
