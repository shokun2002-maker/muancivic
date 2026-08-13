"use client";

import React from "react";
import { useRouter } from "next/navigation";
import VoiceForm from "@/components/admin/VoiceForm";
import { createVoice } from "@/lib/admin/voices";
import { VoiceDbRow } from "@/types/voice";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewVoicePage() {
  const router = useRouter();

  const handleSubmit = async (
    payload: Omit<VoiceDbRow, "id" | "created_at" | "updated_at">
  ) => {
    await createVoice(payload);
    alert("시민 제안이 등록되었습니다.");
    router.push("/admin/voices");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/voices"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">새 시민의 목소리 등록</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            군민들의 제안, 의견 및 처리 상태를 작성합니다.
          </p>
        </div>
      </div>

      <VoiceForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/voices")}
      />
    </div>
  );
}
