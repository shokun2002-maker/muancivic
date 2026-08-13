"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminVoices, deleteVoice } from "@/lib/admin/voices";
import { VoiceDbRow } from "@/types/voice";
import { Plus, Edit2, Trash2, Search, Tag, MessageSquare, ThumbsUp, Eye, EyeOff } from "lucide-react";

export default function AdminVoicesPage() {
  const [voices, setVoices] = useState<VoiceDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchVoices = async () => {
    setLoading(true);
    try {
      const data = await getAdminVoices({
        category: categoryFilter || undefined,
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setVoices(data);
    } catch (e) {
      console.error(e);
      alert("시민의 목소리 목록을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, [categoryFilter, statusFilter, searchQuery]);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `정말 "${title}" 제안을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`
    );
    if (!confirmed) return;

    try {
      await deleteVoice(id);
      alert("제안이 삭제되었습니다.");
      fetchVoices();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "검토 중":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
            검토 중
          </span>
        );
      case "공론화":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
            공론화
          </span>
        );
      case "정책제안":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
            정책제안
          </span>
        );
      case "답변완료":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800">
            답변완료
          </span>
        );
      case "접수":
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-800">
            접수
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
          <h1 className="text-2xl font-extrabold text-gray-900">시민의 목소리 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            군민들의 다양한 제안과 의견, 처리 상태를 관리합니다.
          </p>
        </div>
        <Link
          href="/admin/voices/new"
          className="inline-flex items-center justify-center gap-2 bg-[#176B52] hover:bg-[#0D4938] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>새 시민의 목소리 등록</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-50/50 flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="제목, 본문, 작성자, slug 검색"
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
            <option value="">전체 분류</option>
            <option value="교통">교통</option>
            <option value="환경">환경</option>
            <option value="농어업">농어업</option>
            <option value="교육">교육</option>
            <option value="복지">복지</option>
            <option value="청년">청년</option>
            <option value="문화·관광">문화·관광</option>
            <option value="지역경제">지역경제</option>
            <option value="행정">행정</option>
            <option value="기타">기타</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 상태</option>
            <option value="접수">접수</option>
            <option value="검토 중">검토 중</option>
            <option value="공론화">공론화</option>
            <option value="정책제안">정책제안</option>
            <option value="답변완료">답변완료</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          시민의 목소리 목록을 불러오는 중입니다...
        </div>
      ) : voices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700">등록된 시민 제안이 없습니다.</p>
          <p className="text-xs text-gray-400 mt-1">상단의 버튼을 눌러 새 제안을 작성해보세요.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">제안 제목 / 내용</th>
                  <th className="px-4 py-3.5">분류</th>
                  <th className="px-4 py-3.5">작성자</th>
                  <th className="px-4 py-3.5">상태</th>
                  <th className="px-4 py-3.5">공개 여부</th>
                  <th className="px-4 py-3.5">공감</th>
                  <th className="px-4 py-3.5">등록일</th>
                  <th className="px-6 py-3.5 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {voices.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 line-clamp-1">"{item.title}"</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{item.slug}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-1">{item.content}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                        <Tag className="w-3 h-3 text-gray-400" />
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600 font-medium">
                      {item.author_name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs">
                      {item.is_public ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          <Eye className="w-3 h-3" /> 공개
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">
                          <EyeOff className="w-3 h-3" /> 비공개
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600 font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-red-500" />
                        {item.likes_count ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/admin/voices/${item.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
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
