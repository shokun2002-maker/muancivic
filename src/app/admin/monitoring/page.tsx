"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminMonitoringPosts, deleteMonitoringPost } from "@/lib/admin/monitoring";
import { MonitoringDbPost } from "@/types/monitoring";
import { Plus, Edit2, Trash2, Search, Filter, Calendar, Tag, FileText } from "lucide-react";

export default function AdminMonitoringPage() {
  const [posts, setPosts] = useState<MonitoringDbPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAdminMonitoringPosts({
        category: categoryFilter || undefined,
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setPosts(data);
    } catch (e) {
      console.error(e);
      alert("모니터링 리포트를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryFilter, statusFilter, searchQuery]);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `정말 "${title}" 리포트를 삭제하시겠습니까?\n삭제된 리포트는 복구할 수 없습니다.`
    );
    if (!confirmed) return;

    try {
      await deleteMonitoringPost(id);
      alert("리포트가 삭제되었습니다.");
      fetchPosts();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
            공개 (Published)
          </span>
        );
      case "hidden":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-700">
            숨김 (Hidden)
          </span>
        );
      case "draft":
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
            임시저장 (Draft)
          </span>
        );
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("ko-KR");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">정책·행정 모니터링 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            무안군정, 의정 활동, 예산 점검 리포트를 등록 및 관리합니다.
          </p>
        </div>
        <Link
          href="/admin/monitoring/new"
          className="inline-flex items-center justify-center gap-2 bg-[#176B52] hover:bg-[#0D4938] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>새 모니터링 작성</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-50/50 flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="제목, 요약, slug 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-sm focus:outline-none text-gray-800"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 카테고리</option>
            <option value="무안군정">무안군정</option>
            <option value="무안군의회">무안군의회</option>
            <option value="예산">예산</option>
            <option value="정책점검">정책점검</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 상태</option>
            <option value="draft">임시저장</option>
            <option value="published">공개</option>
            <option value="hidden">숨김</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          모니터링 리포트를 불러오는 중입니다...
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700">등록된 모니터링 리포트가 없습니다.</p>
          <p className="text-xs text-gray-400 mt-1">상단의 버튼을 눌러 새 리포트를 작성해보세요.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">제목 / 요약</th>
                  <th className="px-4 py-3.5">카테고리</th>
                  <th className="px-4 py-3.5">상태</th>
                  <th className="px-4 py-3.5">공개일</th>
                  <th className="px-4 py-3.5">작성일</th>
                  <th className="px-6 py-3.5 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 line-clamp-1">{post.title}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{post.slug}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-1">{post.summary}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                        <Tag className="w-3 h-3 text-gray-400" />
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600 font-medium">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/admin/monitoring/${post.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-200 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>삭제</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
