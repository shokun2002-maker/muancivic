"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { ResourceDbRow } from "@/types/resource";
import { generateSlug } from "@/lib/slug";

interface ResourceFormProps {
  initialData?: ResourceDbRow;
  onSubmit: (
    payload: Omit<ResourceDbRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  onCancel?: () => void;
}

const CATEGORY_OPTIONS = [
  "정책자료",
  "토론·포럼",
  "정책질의",
  "조사·분석",
  "공공자료",
  "기타자료",
];

export default function ResourceForm({
  initialData,
  onSubmit,
  onCancel,
}: ResourceFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "정책자료");
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [source, setSource] = useState(initialData?.source ?? "무안 자치주권시민연대");
  const [fileUrl, setFileUrl] = useState(initialData?.file_url ?? "");
  const [status, setStatus] = useState<"draft" | "published" | "hidden">(
    initialData?.status ?? "draft"
  );
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at ? initialData.published_at.slice(0, 10) : ""
  );
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
    const payload: Omit<ResourceDbRow, "id" | "created_at" | "updated_at"> = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || "기타자료",
      summary: summary.trim() || null,
      source: source.trim() || "무안 자치주권시민연대",
      file_url: fileUrl.trim() || null,
      status,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
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
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="정책자료 제목을 입력하세요"
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
            카테고리 <span className="text-red-500">*</span>
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
            출처 / 작성기관 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            placeholder="예: 무안 자치주권시민연대 정책위원회"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">상태</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "draft" | "published" | "hidden")
            }
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="draft">임시저장 (Draft)</option>
            <option value="published">공개 (Published)</option>
            <option value="hidden">숨김 (Hidden)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">공개일 (선택)</label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">
            파일 URL / 링크 (선택)
          </label>
          <input
            type="text"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="예: /files/report.pdf 또는 https://example.com/doc.pdf"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            * 상대경로(`/files/...`) 및 웹 링크(`https://...`) 모두 등록할 수 있습니다.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">요약 설명</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            placeholder="자료의 주요 내용 및 설명을 입력하세요"
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
