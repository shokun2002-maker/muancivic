"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SubHero from "@/components/SubHero";
import StatusBadge from "@/components/StatusBadge";
import { getPublicEvents, formatEventSchedule } from "@/lib/data/events";
import { EventDbRow } from "@/types/event";
import { Users, Calendar, MapPin, CheckCircle2, Send, X, Loader2, Info } from "lucide-react";

export default function ParticipatePage() {
  const [events, setEvents] = useState<EventDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventDbRow | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPublicEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleApplyClick = (evt: EventDbRow) => {
    if (evt.status === "모집예정") {
      alert("아직 신청 기간이 아닙니다.");
      return;
    }
    if (evt.status === "마감") {
      alert("신청이 마감되었습니다.");
      return;
    }
    alert("온라인 참여 신청 기능은 준비 중입니다.");
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="시민참여"
        category="함께하기"
        subtitle="시민의 작은 참여가 지역을 변화시키는 시작입니다."
        breadcrumbItems={[
          { name: "함께하기", href: "/join" },
          { name: "시민참여" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#176B52]/10 text-[#176B52] text-xs font-extrabold tracking-wider uppercase mb-3">
            <Users className="w-4 h-4" />
            PARTICIPATION & VOLUNTEERING
          </span>
          <h2 className="text-3xl font-extrabold text-[#222222]">
            시민참여 프로그램
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-medium">
            토론회, 캠페인, 자원봉사, 재능기부 등 원하는 분야의 행동하는 시민으로 참여해 주세요.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-500">참여 프로그램 목록을 로딩 중입니다...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto space-y-3">
            <Info className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-extrabold text-gray-900">
              현재 모집 중이거나 예정된 시민참여 프로그램이 없습니다.
            </h3>
            <p className="text-xs text-gray-500">
              새로운 시민 토론회나 봉사 활동이 등록되면 본 페이지를 통해 공지됩니다.
            </p>
          </div>
        ) : (
          /* Participation Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image if available */}
                  {evt.thumbnail_url && (
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                      <Image
                        src={evt.thumbnail_url}
                        alt={evt.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-block text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
                        {evt.category}
                      </span>
                      <StatusBadge status={evt.status} />
                    </div>

                    <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                      {evt.title}
                    </h3>

                    {evt.description && (
                      <p className="text-xs text-[#666666] leading-relaxed mb-6 line-clamp-3">
                        {evt.description}
                      </p>
                    )}

                    <div className="space-y-2 text-xs text-gray-500 font-medium pt-4 border-t border-gray-100 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>일정: {formatEventSchedule(evt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>장소: {evt.location || "장소 미정"}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedEvent(evt)}
                      className="w-full py-3 px-4 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 shadow flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>참가 신청하기 (상세보기)</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Event Detail & Application */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full p-8 border border-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-700 rounded-full bg-white/80"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedEvent.thumbnail_url && (
                <div className="relative w-full h-48 bg-gray-100 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={selectedEvent.thumbnail_url}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
                  {selectedEvent.category}
                </span>
                <StatusBadge status={selectedEvent.status} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#222222] mb-4">
                {selectedEvent.title}
              </h3>

              {selectedEvent.description && (
                <div className="p-4 bg-gray-50 rounded-2xl text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
                  <p className="whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              )}

              <div className="p-4 bg-[#F7F7F3] rounded-2xl space-y-1.5 text-xs text-gray-600 font-medium mb-6">
                <p>🗓️ <strong>일정:</strong> {formatEventSchedule(selectedEvent)}</p>
                <p>📍 <strong>장소:</strong> {selectedEvent.location || "장소 미정"}</p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyClick(selectedEvent)}
                  className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>참가 신청하기</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
