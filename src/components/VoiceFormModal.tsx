"use client";

import React, { useState } from "react";
import { X, Send, MessageSquarePlus, Loader2 } from "lucide-react";
import { VOICE_CATEGORIES } from "@/data/voices";
import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/slug";

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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      // Generate unique slug with timestamp suffix to prevent unique constraint collisions
      const baseSlug = generateSlug(formData.title.trim()) || "proposal";
      const slug = `${baseSlug}-${Date.now()}`;

      // Insert proposal into citizen_voices: status='접수', likes_count=0, is_public=false (requires admin review before published)
      const { error } = await supabase.from("citizen_voices").insert({
        category: formData.category,
        title: formData.title.trim(),
        slug,
        content: formData.content.trim(),
        author_name: formData.author.trim() || "군민",
        status: "접수",
        likes_count: 0,
        is_public: false,
      });

      if (error) throw error;

      alert("소중한 시민의 목소리가 접수되었습니다! 담당자 검토 후 게시될 예정입니다.");
      setFormData({
        category: "교통",
        title: "",
        content: "",
        author: "",
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert("제안 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
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

          <div className="pt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>등록 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>시민의 목소리 제출하기</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
