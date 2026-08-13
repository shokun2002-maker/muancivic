"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import IssueForm from "@/components/admin/IssueForm";
import { getAdminIssueById, updateIssue } from "@/lib/admin/issues";
import PrincipleList from "@/components/admin/PrincipleList";
import UpdateList from "@/components/admin/UpdateList";
import { Issue } from "@/types/issue";

export default function EditIssuePage() {
  const router = useRouter();
  const params = useParams();
  const issueId = params.id as string;

  const [initialData, setInitialData] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const data = await getAdminIssueById(issueId);
        if (!data) {
          alert("현안을 찾을 수 없습니다.");
          router.push("/admin/issues");
          return;
        }
        setInitialData(data);
      } catch (e) {
        console.error(e);
        alert("현안을 로드하는 중 오류가 발생했습니다.");
        router.push("/admin/issues");
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [issueId, router]);

  const handleSubmit = async (payload: Omit<Issue, "id" | "created_at" | "updated_at">) => {
    await updateIssue(issueId, payload);
    alert("현안이 업데이트되었습니다.");
    router.push("/admin/issues");
  };

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">현안 수정</h1>
      {initialData && (
        <>
          <IssueForm initialData={initialData} onSubmit={handleSubmit} onCancel={() => router.back()} />
          {/* Admin sub‑sections */}
          <PrincipleList issueId={issueId} />
          <UpdateList issueId={issueId} />
        </>
      )}
    </div>
  );
}
