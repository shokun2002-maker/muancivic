"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MonitoringForm from "@/components/admin/MonitoringForm";
import { createMonitoringPost } from "@/lib/admin/monitoring";
import { MonitoringDbPost } from "@/types/monitoring";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewMonitoringPage() {
  const router = useRouter();

  const handleSubmit = async (
    payload: Omit<MonitoringDbPost, "id" | "created_at" | "updated_at">
  ) => {
    await createMonitoringPost(payload);
    alert("모니터링 리포트가 생성되었습니다.");
    router.push("/admin/monitoring");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/monitoring"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">새 모니터링 리포트 작성</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            무안군정, 의정 활동, 예산 점검 등의 새 모니터링 리포트를 작성합니다.
          </p>
        </div>
      </div>

      <MonitoringForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/monitoring")}
      />
    </div>
  );
}
