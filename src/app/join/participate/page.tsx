"use client";

import React, { useState } from "react";
import SubHero from "@/components/SubHero";
import StatusBadge from "@/components/StatusBadge";
import { PARTICIPATION_EVENTS, ParticipationEvent } from "@/data/events";
import { Users, Calendar, MapPin, CheckCircle2, Send, X, AlertCircle } from "lucide-react";

export default function ParticipatePage() {
  const [selectedEvent, setSelectedEvent] = useState<ParticipationEvent | null>(null);

  const handleApplySample = () => {
    alert("시민참여 프로그램 참가 신청이 완료되었습니다! (현재는 UI 시연 단계입니다)");
    setSelectedEvent(null);
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

        {/* Participation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PARTICIPATION_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-block text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
                    {evt.category}
                  </span>
                  <StatusBadge status={evt.status} />
                </div>

                <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                  {evt.title}
                </h3>

                <p className="text-xs text-[#666666] leading-relaxed mb-6">
                  {evt.summary}
                </p>

                <div className="space-y-2 text-xs text-gray-500 font-medium pt-4 border-t border-gray-100 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>일시: {evt.dateStr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>장소: {evt.location}</span>
                  </div>
                </div>
              </div>

              <div>
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
          ))}
        </div>

        {/* Modal for Event Detail & Application */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full p-8 border border-gray-100 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
                  {selectedEvent.category}
                </span>
                <StatusBadge status={selectedEvent.status} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#222222] mb-4">
                {selectedEvent.title}
              </h3>

              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl mb-6 flex items-center gap-2 text-xs font-bold text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>현재는 UI 시연 단계로 신청 데이터는 저장되지 않습니다.</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
                {selectedEvent.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 text-xs text-gray-600 font-medium mb-6">
                <p>🗓️ <strong>일시:</strong> {selectedEvent.dateStr}</p>
                <p>📍 <strong>장소:</strong> {selectedEvent.location}</p>
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
                  onClick={handleApplySample}
                  className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>참가 신청 제출 (시연)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
