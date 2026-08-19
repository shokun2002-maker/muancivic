"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminIssues, deleteIssue } from "@/lib/admin/issues";
import { Issue } from "@/types/issue";
import StatusBadge from "@/components/StatusBadge";
import { Plus, Edit, Trash2, Loader2, FileText } from "lucide-react";

const AdminIssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const data = await getAdminIssues();
      setIssues(data);
    } catch (e) {
      console.error(e);
      alert("현안 목록을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`'${title}' 현안을 정말 삭제하시겠습니까?\n삭제한 현안은 복구할 수 없습니다.`)) return;
    setDeletingId(id);
    try {
      await deleteIssue(id);
      alert("현안이 성공적으로 삭제되었습니다.");
      fetchIssues();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#176B52]" />
            주요 현안 관리
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            무안군 주요 이슈 및 자치주권 대응 현안을 작성하고 공개 상태를 관리합니다.
          </p>
        </div>

        <Link
          href="/admin/issues/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>신규 현안 작성</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
          <p className="text-sm font-semibold text-gray-600">현안 목록을 불러오는 중입니다...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
          등록된 주요 현안이 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">현안 제목</th>
                  <th className="px-4 py-3.5">카테고리</th>
                  <th className="px-4 py-3.5">공개 여부</th>
                  <th className="px-4 py-3.5">진행 상태</th>
                  <th className="px-4 py-3.5">작성일</th>
                  <th className="px-6 py-3.5 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {issue.title}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs font-semibold text-gray-600">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md">
                        {issue.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                          issue.visibility === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }`}
                      >
                        {issue.visibility === "published" ? "공개 (Published)" : "임시 (Draft)"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={issue.status || "대응 중"} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      {new Date(issue.created_at).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                      <Link
                        href={`/admin/issues/${issue.id}/edit`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>수정</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(issue.id, issue.title)}
                        disabled={deletingId === issue.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-50 transition-colors disabled:opacity-50"
                      >
                        {deletingId === issue.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        <span>삭제</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden divide-y divide-gray-100">
            {issues.map((issue) => (
              <div key={issue.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-2.5 py-0.5 rounded">
                    {issue.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                        issue.visibility === "published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                    >
                      {issue.visibility === "published" ? "공개" : "임시"}
                    </span>
                    <StatusBadge status={issue.status || "대응 중"} />
                  </div>
                </div>

                <h3 className="font-bold text-base text-gray-900">{issue.title}</h3>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-50">
                  <Link
                    href={`/admin/issues/${issue.id}/edit`}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white"
                  >
                    수정
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(issue.id, issue.title)}
                    disabled={deletingId === issue.id}
                    className="px-3 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold bg-white"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminIssuesPage;
