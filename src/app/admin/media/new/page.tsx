"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MediaForm from "@/components/admin/MediaForm";
import { createMedia } from "@/lib/admin/media";
import { MediaAlbumDbRow } from "@/types/media";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewMediaPage() {
  const router = useRouter();

  const handleSubmit = async (
    payload: Omit<MediaAlbumDbRow, "id" | "created_at" | "updated_at">
  ) => {
    await createMedia(payload);
    alert("미디어가 등록되었습니다.");
    router.push("/admin/media");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/media"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">새 미디어 등록</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            활동 사진 앨범 또는 영상 기록을 새롭게 등록합니다.
          </p>
        </div>
      </div>

      <MediaForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/media")}
      />
    </div>
  );
}
