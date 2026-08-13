"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { createResource } from "@/lib/admin/resources";
import { ResourceDbRow } from "@/types/resource";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewResourcePage() {
  const router = useRouter();

  const handleSubmit = async (
    payload: Omit<ResourceDbRow, "id" | "created_at" | "updated_at">
  ) => {
    await createResource(payload);
    alert("정책자료가 등록되었습니다.");
    router.push("/admin/resources");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/resources"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">새 정책자료 등록</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            정책보고서, 발제집, 조사분석 등 시민연대의 정책자료를 등록합니다.
          </p>
        </div>
      </div>

      <ResourceForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/resources")}
      />
    </div>
  );
}
