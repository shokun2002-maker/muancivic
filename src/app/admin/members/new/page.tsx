"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MemberForm from "@/components/admin/MemberForm";
import { createMember } from "@/lib/admin/members";
import { MemberProfileDbRow } from "@/types/member";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemberPage() {
  const router = useRouter();

  const handleSubmit = async (
    payload: Omit<MemberProfileDbRow, "id" | "created_at" | "updated_at">
  ) => {
    await createMember(payload);
    alert("신규 회원이 등록되었습니다.");
    router.push("/admin/members");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/members"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">신규 회원 등록</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            정회원, 준회원, 후원회원 정보를 관리자가 직접 등록합니다.
          </p>
        </div>
      </div>

      <MemberForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/members")}
      />
    </div>
  );
}
