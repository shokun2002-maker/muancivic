"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Issue } from "@/types/issue";
import { generateSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/client";
import { Upload, Loader2, X } from "lucide-react";

interface IssueFormProps {
  /** When editing, provide the existing issue data */
  initialData?: Issue;
  /** Callback to handle submission. Should create or update the issue. */
  onSubmit: (payload: Omit<Issue, "id" | "created_at" | "updated_at">) => Promise<void>;
  /** Optional cancel handler (e.g., navigate back) */
  onCancel?: () => void;
}

const PROGRESS_STATUS_OPTIONS = ["대응 중", "모니터링", "해결", "종료"];

export default function IssueForm({ initialData, onSubmit, onCancel }: IssueFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "군정 · 안보");
  const [status, setStatus] = useState(initialData?.status ?? "대응 중");
  const [visibility, setVisibility] = useState(initialData?.visibility ?? "published");
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [overview, setOverview] = useState(initialData?.overview ?? "");
  const [currentSituation, setCurrentSituation] = useState(initialData?.current_situation ?? "");
  const [keyPoints, setKeyPoints] = useState(initialData?.key_points ?? "");
  const [positionText, setPositionText] = useState(initialData?.position_text ?? "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail_url ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at ? initialData.published_at.slice(0, 10) : ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-generate slug from title on create mode
  useEffect(() => {
    if (!initialData && title) {
      setSlug(generateSlug(title));
    }
  }, [title, initialData]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 최대 5MB까지 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("JPG, PNG, WebP 이미지 파일만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
      }

      const rawExt = file.name.split(".").pop() || "jpg";
      const sanitizedExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filePath = `issues/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${sanitizedExt}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase Storage upload error:", uploadError);
        throw new Error(`이미지 업로드에 실패했습니다. (${uploadError.message})`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error("업로드 이미지의 Public URL을 반환받지 못했습니다.");
      }

      setThumbnail(publicUrlData.publicUrl);
    } catch (err) {
      console.error("File upload process failed:", err);
      const errorMessage =
        err instanceof Error ? err.message : "이미지 업로드 도중 오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isUploading) return;

    setIsSubmitting(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      status: status.trim() || "대응 중",
      visibility: visibility.trim() || "published",
      summary: summary.trim(),
      overview: overview.trim() || null,
      current_situation: currentSituation.trim() || null,
      key_points: keyPoints.trim() || null,
      position_text: positionText.trim() || null,
      thumbnail_url: thumbnail.trim() ? thumbnail.trim() : null,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
    } as Omit<Issue, "id" | "created_at" | "updated_at">;

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
      className="space-y-6 max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 제목 */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">
            현안 제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="주요 현안 제목을 입력하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Slug (주소) <span className="text-red-500">*</span>
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

        {/* 카테고리 */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            카테고리 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="예: 군정 · 안보, 환경 · 주민보건"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        {/* 공개 여부 */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            공개 여부 (Visibility) <span className="text-red-500">*</span>
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm font-bold text-[#176B52]"
          >
            <option value="published">공개 (Published)</option>
            <option value="draft">임시저장 (Draft)</option>
          </select>
        </div>

        {/* 진행 상태 */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            현안 진행 상태 (Status) <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            {PROGRESS_STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* 공개일 */}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">공개일 (선택)</label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        {/* 요약 */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">
            현안 요약 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            rows={3}
            placeholder="현안의 핵심 내용을 요약하여 입력하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        {/* 대표 이미지 (Supabase Storage 파일 업로드) */}
        <div className="md:col-span-2 space-y-2">
          <label className="block font-semibold text-gray-800">
            현안 대표 이미지 (개별 지정 가능)
          </label>

          {/* Current Image Preview */}
          {thumbnail ? (
            <div className="relative border border-gray-200 rounded-2xl p-3 bg-gray-50 flex items-center gap-4">
              <div className="relative w-28 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0 border border-gray-300">
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-700 truncate">{thumbnail}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  ✓ 대표 이미지로 설정됨
                </p>
              </div>

              <button
                type="button"
                onClick={() => setThumbnail("")}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="대표 이미지 삭제"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : null}

          {/* Upload Button */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label
              className={`inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl cursor-pointer transition-colors border border-gray-300 ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#176B52]" />
                  <span>이미지 업로드 중...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-[#176B52]" />
                  <span>PC에서 이미지 파일 선택</span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            <span className="text-[11px] text-gray-500 font-medium">
              * JPG, PNG, WebP (최대 5MB)
            </span>
          </div>

          {/* Fallback Direct URL Input */}
          <div className="pt-2">
            <label className="block text-xs text-gray-500 mb-1">
              또는 URL 직접 입력 (기본값: /inaugural_assembly.jpg)
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="예: /inaugural_assembly.jpg 또는 https://..."
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-xs text-gray-700 bg-gray-50/50"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || isUploading}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-5 py-2.5 bg-[#176B52] text-white font-semibold text-sm rounded-xl hover:bg-[#0D4938] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
