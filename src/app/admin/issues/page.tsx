"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdminIssues, deleteIssue } from "@/lib/admin/issues";
import { Issue } from "@/types/issue";
import IssueForm from "@/components/admin/IssueForm";

const AdminIssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const data = await getAdminIssues();
      setIssues(data);
    } catch (e) {
      console.error(e);
      alert("현안을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("정말 이 현안을 삭제하시겠습니까?\n삭제한 현안은 복구할 수 없습니다.");
    if (!confirmed) return;
    try {
      await deleteIssue(id);
      alert("현안이 삭제되었습니다.");
      fetchIssues();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">현안 관리</h1>
      <div className="flex justify-between mb-4">
        <Link href="/admin/issues/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap">
          새 현안 작성
        </Link>
      </div>
      {loading ? (
        <p>불러오는 중...</p>
      ) : isMobile ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="border rounded p-4">
              <h2 className="font-medium text-lg">{issue.title}</h2>
              <p className="text-sm text-gray-600">카테고리: {issue.category}</p>
              <p className="text-sm text-gray-600">상태: {issue.status}</p>
              <div className="flex space-x-2 mt-2">
                <Link href={`/admin/issues/${issue.id}/edit`} className="text-blue-600 hover:underline">
                  수정
                </Link>
                <button type="button" onClick={() => handleDelete(issue.id)} className="text-red-600 hover:underline">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">제목</th>
                <th className="px-4 py-2">카테고리</th>
                <th className="px-4 py-2">상태</th>
                <th className="px-4 py-2">공개일</th>
                <th className="px-4 py-2">작성일</th>
                <th className="px-4 py-2 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{issue.title}</td>
                  <td className="px-4 py-2">{issue.category}</td>
                  <td className="px-4 py-2">{issue.status}</td>
                  <td className="px-4 py-2">{issue.published_at ? new Date(issue.published_at).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2">{new Date(issue.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <Link href={`/admin/issues/${issue.id}/edit`} className="text-blue-600 hover:underline">
                      수정
                    </Link>
                    <button type="button" onClick={() => handleDelete(issue.id)} className="text-red-600 hover:underline">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminIssuesPage;
