"use client";

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { EventDbRow, EventStatus } from "@/types/event";
import { EventInputPayload } from "@/lib/admin/events";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Loader2, Upload, X, Image as ImageIcon } from "lucide-react";

interface Props {
  initialData?: EventDbRow | null;
  onSubmit: (payload: EventInputPayload) => Promise<void>;
  isEditing?: boolean;
}

export default function EventForm({ initialData, onSubmit, isEditing = false }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "시민토론회");
  const [status, setStatus] = useState<EventStatus>(initialData?.status || "모집예정");
  
  // Date Picker States (YYYY-MM-DD)
  const [startAt, setStartAt] = useState(
    initialData?.start_at ? initialData.start_at.slice(0, 10) : ""
  );
  const [endAt, setEndAt] = useState(
    initialData?.end_at ? initialData.end_at.slice(0, 10) : ""
  );

  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || "");

  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // File Upload Handler (PC Image Direct Upload to Storage 'media' bucket under events/)
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. File size limit (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("이미지 파일 크기는 최대 5MB까지 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    // 2. Allowed File Types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("JPG, PNG, WebP 이미지 파일만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
      }

      // Safe file path: events/{timestamp}-{random}.{ext}
      const rawExt = file.name.split(".").pop() || "jpg";
      const sanitizedExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filePath = `events/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${sanitizedExt}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw new Error(`이미지 업로드에 실패했습니다. (${uploadError.message})`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error("업로드 이미지의 Public URL을 반환받지 못했습니다.");
      }

      setThumbnailUrl(publicUrlData.publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      const errMsg = err instanceof Error ? err.message : "이미지 업로드 중 오류가 발생했습니다.";
      alert(errMsg);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("행사명을 입력해 주세요.");
      return;
    }
    if (!category.trim()) {
      alert("카테고리를 선택해 주세요.");
      return;
    }

    // Date Range Validation
    if (startAt && endAt && new Date(endAt) < new Date(startAt)) {
      alert("종료일은 시작일보다 이전 날짜일 수 없습니다.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        category: category.trim(),
        status,
        start_at: startAt ? new Date(startAt).toISOString() : null,
        end_at: endAt ? new Date(endAt).toISOString() : null,
        location: location.trim() || null,
        description: description.trim() || null,
        thumbnail_url: thumbnailUrl.trim() || null,
      });
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">
          {isEditing ? "행사 정보 수정" : "신규 행사 작성"}
        </h2>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>목록으로 돌아가기</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            행사명 (제목) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 무안 지역현안 시민토론회"
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          >
            <option value="시민토론회">시민토론회</option>
            <option value="캠페인">캠페인</option>
            <option value="자원봉사">자원봉사</option>
            <option value="재능기부">재능기부</option>
            <option value="행사참여">행사참여</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            모집/진행 상태 <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as EventStatus)}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          >
            <option value="모집예정">모집예정</option>
            <option value="참여가능">참여가능</option>
            <option value="상시모집">상시모집</option>
            <option value="마감">마감</option>
          </select>
        </div>

        {/* Date Selector UI (Start Date / End Date) */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            행사 시작일 {status !== "상시모집" && <span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            required={status !== "상시모집"}
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            행사 종료일 (선택 / 기간 행사 시)
          </label>
          <input
            type="date"
            value={endAt}
            min={startAt}
            onChange={(e) => setEndAt(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            장소
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="예: 무안 승달문화예술회관 소강당"
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            행사 설명 / 내용
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="행사의 주요 취지, 안내 사항 및 프로그램 내용을 입력하세요."
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
          />
        </div>

        {/* Thumbnail PC File Upload Section */}
        <div className="sm:col-span-2 space-y-3 pt-2">
          <label className="block text-xs font-bold text-gray-700">
            행사 썸네일 이미지
          </label>

          {thumbnailUrl && (
            <div className="relative border border-gray-200 rounded-2xl p-3 bg-gray-50 flex items-center gap-4">
              <div className="relative w-28 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0 border border-gray-300">
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-700 truncate">{thumbnailUrl}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  ✓ 대표 이미지로 설정됨
                </p>
              </div>

              <button
                type="button"
                onClick={() => setThumbnailUrl("")}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="썸네일 삭제"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

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
                  <span>PC에서 이미지 파일 선택 (업로드)</span>
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

          <div className="pt-2">
            <label className="block text-[11px] text-gray-500 mb-1">
              또는 이미지 URL 직접 입력 (보조 수단)
            </label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="예: /inaugural_assembly.jpg 또는 https://..."
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-xs text-gray-700 bg-gray-50/50"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
        <Link
          href="/admin/events"
          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors"
        >
          취소
        </Link>
        <button
          type="submit"
          disabled={submitting || isUploading}
          className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isEditing ? "수정사항 저장" : "행사 등록"}</span>
        </button>
      </div>
    </form>
  );
}
