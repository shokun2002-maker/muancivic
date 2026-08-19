"use client";

import React, { useEffect, useState } from "react";
import {
  getAdminEventApplications,
  updateEventApplicationStatus,
} from "@/lib/data/applications";
import { EventApplicationDbRow } from "@/types/event_application";
import { X, Users, Loader2, RefreshCw, CheckCircle, Clock, XCircle } from "lucide-react";

interface Props {
  eventId?: string;
  eventTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventApplicationsModal({
  eventId,
  eventTitle,
  isOpen,
  onClose,
}: Props) {
  const [applications, setApplications] = useState<EventApplicationDbRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await getAdminEventApplications(eventId);
      setApplications(data);
    } catch (err) {
      console.error(err);
      alert("신청자 목록을 불러오는 도중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchApplications();
    }
  }, [isOpen, eventId]);

  if (!isOpen) return null;

  const handleStatusChange = async (
    id: string,
    newStatus: "received" | "confirmed" | "cancelled"
  ) => {
    setUpdatingId(id);
    try {
      await updateEventApplicationStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      console.error(err);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const totalParticipants = applications.reduce(
    (acc, item) => (item.status !== "cancelled" ? acc + item.participant_count : acc),
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#176B52]" />
              <h2 className="text-xl font-extrabold text-gray-900">
                행사 참가지원 신청자 목록
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {eventTitle ? `[${eventTitle}]` : "전체 행사"} - 총 신청 {applications.length}건 (참가 인원: {totalParticipants}명)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchApplications}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              title="새로고침"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
              <p className="text-xs font-semibold text-gray-500">
                신청자 목록을 로딩 중입니다...
              </p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-xs">
              아직 접수된 참가 신청 내역이 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase">
                  <tr>
                    <th className="px-4 py-3">신청자</th>
                    <th className="px-4 py-3">연락처 / 이메일</th>
                    <th className="px-3 py-3 text-center">인원</th>
                    <th className="px-4 py-3">전달사항</th>
                    <th className="px-4 py-3">신청일시</th>
                    <th className="px-4 py-3 text-center">상태 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-gray-900">
                        {app.applicant_name}
                      </td>
                      <td className="px-4 py-3.5 space-y-0.5">
                        <div className="font-semibold text-gray-800">{app.phone}</div>
                        {app.email && (
                          <div className="text-[11px] text-gray-500">{app.email}</div>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-center font-bold text-[#176B52]">
                        {app.participant_count}명
                      </td>
                      <td className="px-4 py-3.5 max-w-xs truncate text-gray-600">
                        {app.message || "-"}
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <select
                          value={app.status}
                          disabled={updatingId === app.id}
                          onChange={(e) =>
                            handleStatusChange(
                              app.id,
                              e.target.value as "received" | "confirmed" | "cancelled"
                            )
                          }
                          className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                            app.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : app.status === "cancelled"
                              ? "bg-rose-50 text-rose-700 border-rose-300"
                              : "bg-amber-50 text-amber-700 border-amber-300"
                          }`}
                        >
                          <option value="received">접수 (received)</option>
                          <option value="confirmed">참가확정 (confirmed)</option>
                          <option value="cancelled">신청취소 (cancelled)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
