"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { VoiceDbRow } from "@/types/voice";
import { generateSlug } from "@/lib/slug";

interface VoiceFormProps {
  initialData?: VoiceDbRow;
  onSubmit: (
    payload: Omit<VoiceDbRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  onCancel?: () => void;
}

const CATEGORY_OPTIONS = [
  "교통",
  "환경",
  "농어업",
  "교육",
  "복지",
  "청년",
  "문화·관광",
  "지역경제",
  "행정",
  "기타",
];

const STATUS_OPTIONS = ["접수", "검토 중", "공론화", "정책제안", "답변완료"];

export default function VoiceForm({
  initialData,
  onSubmit,
  onCancel,
}: VoiceFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "기타");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [authorName, setAuthorName] = useState(initialData?.author_name ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "접수");
  const [likesCount, setLikesCount] = useState(initialData?.likes_count ?? 0);
  const [isPublic, setIsPublic] = useState(initialData?.is_public ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (!initialData && title) {
      setSlug(generateSlug(title));
    }
  }, [title, initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const payload: Omit<VoiceDbRow, "id" | "created_at" | "updated_at"> = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || "기타",
      content: content.trim(),
      author_name: authorName.trim() || "군민",
      status: status.trim() || "접수",
      likes_count: Number(likesCount) || 0,
      is_public: isPublic,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">
            제안 제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="시민 제안 제목을 입력하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            disabled={!!initialData}
            placeholder="url-friendly-slug"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            분류 <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            작성자 / 주민명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            placeholder="예: 무안 주민, 김00"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            처리 상태 <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">공감 수 (Likes)</label>
          <input
            type="number"
            min={0}
            value={likesCount}
            onChange={(e) => setLikesCount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">공개 설정</label>
          <select
            value={isPublic ? "true" : "false"}
            onChange={(e) => setIsPublic(e.target.value === "true")}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="true">공개 (Public)</option>
            <option value="false">비공개/숨김 (Private)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">
            제안 본문 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            placeholder="주민의 제안 내용 및 상세 의견을 입력하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-[#176B52] text-white font-semibold text-sm rounded-xl hover:bg-[#0D4938] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
