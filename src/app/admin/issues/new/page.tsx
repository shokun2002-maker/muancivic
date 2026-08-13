"use client";

import React from "react";
import { useRouter } from "next/navigation";
import IssueForm from "@/components/admin/IssueForm";
import { createIssue } from "@/lib/admin/issues";
import { Issue } from "@/types/issue";

export default function NewIssuePage() {
  const router = useRouter();

  const handleSubmit = async (payload: Omit<Issue, "id" | "created_at" | "updated_at">) => {
    await createIssue(payload);
    alert("현안이 생성되었습니다.");
    router.push("/admin/issues");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">새 현안 작성</h1>
      <IssueForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  );
}
