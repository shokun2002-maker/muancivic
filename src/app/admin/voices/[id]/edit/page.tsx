"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VoiceForm from "@/components/admin/VoiceForm";
import { getAdminVoiceById, updateVoice } from "@/lib/admin/voices";
import { VoiceDbRow } from "@/types/voice";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditVoicePage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [voice, setVoice] = useState<VoiceDbRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getAdminVoiceById(id);
        if (!data) {
          alert("존재하지 않거나 삭제된 시민 제안입니다.");
          router.push("/admin/voices");
          return;
        }
        setVoice(data);
      } catch (err) {
        console.error(err);
        alert("데이터를 불러오는 도중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, router]);

  const handleSubmit = async (
    payload: Omit<VoiceDbRow, "id" | "created_at" | "updated_at">
  ) => {
    await updateVoice(id, payload);
    alert("시민 제안이 성공적으로 수정되었습니다.");
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
          <h1 className="text-2xl font-extrabold text-gray-900">시민의 목소리 수정</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            등록된 제안 내용 및 처리 상태를 수정합니다.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
          <p className="text-sm font-semibold text-gray-600">
            시민 제안 데이터를 읽어오는 중입니다...
          </p>
        </div>
      ) : voice ? (
        <VoiceForm
          initialData={voice}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/voices")}
        />
      ) : null}
    </div>
  );
}
