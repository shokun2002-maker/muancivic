"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getMyAdminProfile } from "@/lib/admin/settings";
import { canManageEvents } from "@/lib/permission";
import { getAdminEvents, deleteEvent } from "@/lib/admin/events";
import { formatEventSchedule } from "@/lib/data/events";
import { EventDbRow } from "@/types/event";
import StatusBadge from "@/components/StatusBadge";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Loader2,
  ShieldAlert,
  Users,
} from "lucide-react";

import EventApplicationsModal from "@/components/admin/EventApplicationsModal";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Application Modal state
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedEventForApp, setSelectedEventForApp] = useState<{ id?: string; title?: string }>({});

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const myProfile = await getMyAdminProfile();
      if (!myProfile || !canManageEvents(myProfile.role)) {
        setHasPermission(false);
        setLoading(false);
        return;
      }

      const list = await getAdminEvents();
      setEvents(list);
    } catch (e) {
      console.error(e);
      alert("행사 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`'${title}' 행사를 정말 삭제하시겠습니까?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteEvent(id);
      alert("행사가 삭제되었습니다.");
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEvents = events.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "전체" || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "전체" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
        <p className="text-sm font-semibold text-gray-600">
          행사·참여 데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="p-6 max-w-4xl mx-auto py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900">접근 권한이 없습니다</h2>
        <p className="text-sm text-gray-600">
          행사·참여 관리는 super_admin 및 content_admin 전용 기능입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#176B52]" />
            행사·참여 관리
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            시민토론회, 캠페인, 자원봉사, 재능기부 등 공개 행사를 등록 및 관리합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedEventForApp({});
              setIsAppModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors"
          >
            <Users className="w-4 h-4 text-[#176B52]" />
            <span>전체 신청자 관리</span>
          </button>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>신규 행사 등록</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="행사명 또는 장소 검색..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#176B52] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700"
          >
            <option value="전체">전체 카테고리</option>
            <option value="시민토론회">시민토론회</option>
            <option value="캠페인">캠페인</option>
            <option value="자원봉사">자원봉사</option>
            <option value="재능기부">재능기부</option>
            <option value="행사참여">행사참여</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700"
          >
            <option value="전체">전체 상태</option>
            <option value="모집예정">모집예정</option>
            <option value="참여가능">참여가능</option>
            <option value="상시모집">상시모집</option>
            <option value="마감">마감</option>
          </select>
        </div>
      </div>

      {/* Main List Table / Mobile Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            등록되거나 검색 조건에 맞는 행사가 없습니다.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">행사명</th>
                    <th className="px-4 py-3.5">구분</th>
                    <th className="px-4 py-3.5">상태</th>
                    <th className="px-4 py-3.5">일정</th>
                    <th className="px-4 py-3.5">장소</th>
                    <th className="px-6 py-3.5 text-center">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {evt.title}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs font-semibold text-gray-600">
                        <span className="bg-gray-100 px-2.5 py-1 rounded-md">
                          {evt.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <StatusBadge status={evt.status} />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                        {formatEventSchedule(evt)}
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500 max-w-xs truncate">
                        {evt.location || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEventForApp({ id: evt.id, title: evt.title });
                            setIsAppModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#176B52]/30 text-[#176B52] bg-[#176B52]/5 rounded-lg text-xs font-semibold hover:bg-[#176B52]/10 transition-colors"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>신청자</span>
                        </button>
                        <Link
                          href={`/admin/events/${evt.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(evt.id, evt.title)}
                          disabled={deletingId === evt.id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-50 transition-colors disabled:opacity-50"
                        >
                          {deletingId === evt.id ? (
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
              {filteredEvents.map((evt) => (
                <div key={evt.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-2.5 py-0.5 rounded">
                      {evt.category}
                    </span>
                    <StatusBadge status={evt.status} />
                  </div>

                  <h3 className="font-bold text-base text-gray-900">
                    {evt.title}
                  </h3>

                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{formatEventSchedule(evt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{evt.location || "장소 미정"}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-50">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEventForApp({ id: evt.id, title: evt.title });
                        setIsAppModalOpen(true);
                      }}
                      className="px-3 py-1.5 border border-[#176B52]/30 text-[#176B52] bg-[#176B52]/5 rounded-lg text-xs font-semibold"
                    >
                      신청자 목록
                    </button>
                    <Link
                      href={`/admin/events/${evt.id}/edit`}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white"
                    >
                      수정
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(evt.id, evt.title)}
                      disabled={deletingId === evt.id}
                      className="px-3 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold bg-white"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Event Applications Management Modal */}
      <EventApplicationsModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        eventId={selectedEventForApp.id}
        eventTitle={selectedEventForApp.title}
      />
    </div>
  );
}
