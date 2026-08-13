"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { MediaAlbumDbRow } from "@/types/media";
import { generateSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/client";
import { Upload, Loader2, Image as ImageIcon, X } from "lucide-react";

interface MediaFormProps {
  initialData?: MediaAlbumDbRow;
  onSubmit: (
    payload: Omit<MediaAlbumDbRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  onCancel?: () => void;
}

export default function MediaForm({
  initialData,
  onSubmit,
  onCancel,
}: MediaFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [type, setType] = useState<"photo" | "video">(initialData?.type ?? "photo");
  const [eventDate, setEventDate] = useState(
    initialData?.event_date ? initialData.event_date.slice(0, 10) : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [status, setStatus] = useState<"draft" | "published" | "hidden">(
    initialData?.status ?? "draft"
  );
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at ? initialData.published_at.slice(0, 10) : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (!initialData && title) {
      setSlug(generateSlug(title));
    }
  }, [title, initialData]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. File size limit (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 최대 5MB까지 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    // 2. Extension limit (jpg, jpeg, png, webp)
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

      // Generate sanitized file path: media/{timestamp}-{random}.{ext}
      const rawExt = file.name.split(".").pop() || "jpg";
      const sanitizedExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filePath = `media/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${sanitizedExt}`;

      // Upload file to Supabase Storage 'media' bucket
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

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error("업로드 이미지의 Public URL을 반환받지 못했습니다.");
      }

      setThumbnailUrl(publicUrlData.publicUrl);
    } catch (err) {
      console.error("File upload process failed:", err);
      const errorMessage =
        err instanceof Error ? err.message : "이미지 업로드 도중 알 수 없는 오류가 발생했습니다.";
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
    const payload: Omit<MediaAlbumDbRow, "id" | "created_at" | "updated_at"> = {
      title: title.trim(),
      slug: slug.trim(),
      type,
      event_date: eventDate ? eventDate : null,
      thumbnail_url: thumbnailUrl.trim() || null,
      description: description.trim() || null,
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
            placeholder="사진/영상 앨범 제목을 입력하세요"
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
            미디어 유형 <span className="text-red-500">*</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "photo" | "video")}
            required
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="photo">사진 (Photo)</option>
            <option value="video">영상 (Video)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">행사/활동 일자 (선택)</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
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

        {/* Representative Thumbnail File Upload Section */}
        <div className="md:col-span-2 space-y-2">
          <label className="block font-semibold text-gray-800">
            대표 썸네일 이미지
          </label>

          {/* Current Image Preview & Actions */}
          {thumbnailUrl ? (
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
          ) : null}

          {/* Upload Button Controls */}
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
              또는 URL 직접 입력 (보조 수단)
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

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">설명 / 내용</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="사진/영상 앨범에 대한 상세 설명을 입력하세요"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
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
