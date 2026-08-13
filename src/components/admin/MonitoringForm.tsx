"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { MonitoringDbPost } from "@/types/monitoring";
import { generateSlug } from "@/lib/slug";

interface MonitoringFormProps {
  initialData?: MonitoringDbPost;
  onSubmit: (
    payload: Omit<MonitoringDbPost, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  onCancel?: () => void;
}

const CATEGORY_OPTIONS = ["무안군정", "무안군의회", "예산", "정책점검"];

export default function MonitoringForm({
  initialData,
  onSubmit,
  onCancel,
}: MonitoringFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "무안군정");
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [overview, setOverview] = useState(initialData?.overview ?? "");
  const [currentStatus, setCurrentStatus] = useState(initialData?.current_status ?? "");
  const [keyIssue, setKeyIssue] = useState(initialData?.key_issue ?? "");
  const [positionText, setPositionText] = useState(initialData?.position_text ?? "");
  const [proposalText, setProposalText] = useState(initialData?.proposal_text ?? "");
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
    const payload: Omit<MonitoringDbPost, "id" | "created_at" | "updated_at"> = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || "정책점검",
      summary: summary.trim(),
      overview: overview.trim() || null,
      current_status: currentStatus.trim() || null,
      key_issue: keyIssue.trim() || null,
      position_text: positionText.trim() || null,
      proposal_text: proposalText.trim() || null,
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
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
            placeholder="모니터링 리포트 제목을 입력하세요"
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
          <label className="block font-semibold text-gray-800 mb-1">상태</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published" | "hidden")}
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
            요약 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            rows={2}
            placeholder="리포트의 요약 설명을 입력하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-5 space-y-4">
        <h3 className="text-base font-bold text-gray-900">리포트 세부 항목</h3>

        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            1. 무엇을 살펴봤나요? (개요 / 대상)
          </label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={3}
            placeholder="조사 대상, 점검 내용 등에 대해 작성하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            2. 현재 어떻게 진행되고 있나요? (진행 현황)
          </label>
          <textarea
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            rows={3}
            placeholder="사업이나 행정 절차의 현재 진행 상태를 작성하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            3. 무엇이 쟁점인가요? (핵심 쟁점)
          </label>
          <textarea
            value={keyIssue}
            onChange={(e) => setKeyIssue(e.target.value)}
            rows={3}
            placeholder="주요 문제점 및 쟁점을 작성하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            4. 시민연대는 이렇게 봅니다 (시각 / 평가)
          </label>
          <textarea
            value={positionText}
            onChange={(e) => setPositionText(e.target.value)}
            rows={3}
            placeholder="무안 자치주권시민연대의 입장 및 평가를 작성하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            5. 시민연대의 제안 (대안 제안)
          </label>
          <textarea
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            rows={3}
            placeholder="시민연대의 구체적인 개선안 및 제안을 작성하세요"
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
