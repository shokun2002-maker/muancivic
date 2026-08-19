"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SubHero from "@/components/SubHero";
import StatusBadge from "@/components/StatusBadge";
import { getPublicEvents, formatEventSchedule } from "@/lib/data/events";
import { submitEventApplication } from "@/lib/data/applications";
import { EventDbRow } from "@/types/event";
import {
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Send,
  X,
  Loader2,
  Info,
  ShieldCheck,
} from "lucide-react";

export default function ParticipatePage() {
  const [events, setEvents] = useState<EventDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventDbRow | null>(null);

  // Application Form States
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [participantCount, setParticipantCount] = useState(1);
  const [message, setMessage] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPublicEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const openModal = (evt: EventDbRow) => {
    setSelectedEvent(evt);
    setIsApplying(false);
    setSubmitSuccess(false);
    setApplicantName("");
    setPhone("");
    setEmail("");
    setParticipantCount(1);
    setMessage("");
    setPrivacyAgreed(false);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsApplying(false);
    setSubmitSuccess(false);
  };

  const handleStartApply = () => {
    if (!selectedEvent) return;
    if (selectedEvent.status === "모집예정") {
      alert("아직 신청 기간이 아닙니다.");
      return;
    }
    if (selectedEvent.status === "마감") {
      alert("신청이 마감되었습니다.");
      return;
    }
    setIsApplying(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!applicantName.trim()) {
      alert("신청자 이름을 입력해주세요.");
      return;
    }
    if (!phone.trim()) {
      alert("연락처를 입력해주세요.");
      return;
    }
    if (!privacyAgreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      await submitEventApplication({
        event_id: selectedEvent.id,
        applicant_name: applicantName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        participant_count: participantCount,
        message: message.trim() || undefined,
        privacy_agreed: true,
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error
          ? err.message
          : "참가 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setSubmitting(false);
    }
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
                      onClick={() => openModal(evt)}
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
                onClick={closeModal}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-700 rounded-full bg-white/80"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                /* Success State */
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-[#176B52] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    참가 신청이 완료되었습니다!
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
                    <strong>[{selectedEvent.title}]</strong> 프로그램에 정상적으로 접수되었습니다.<br />
                    담당자가 확인 후 안내 문자를 발송해 드릴 예정입니다.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 px-8 py-3 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-sm rounded-xl transition-all shadow"
                  >
                    확인 및 닫기
                  </button>
                </div>
              ) : isApplying ? (
                /* Form State */
                <form onSubmit={handleSubmitApplication} className="space-y-5">
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <span className="text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
                      {selectedEvent.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-[#222222] mt-2">
                      {selectedEvent.title} - 온라인 참가 신청
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      신청자 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      연락처 (휴대전화 번호) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        참여 인원수 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        required
                        value={participantCount}
                        onChange={(e) => setParticipantCount(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        이메일 (선택)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      전달사항 / 문의사항 (선택)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="행사 참석 관련 전달사항이나 문의사항을 입력하세요"
                      className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                    />
                  </div>

                  {/* Privacy Consent Box */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                      <ShieldCheck className="w-4 h-4 text-[#176B52]" />
                      개인정보 수집 · 이용 동의 (필수)
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      무안자치분권시민연대는 행사 참가 신청 확인 및 안내를 위하여 이름, 연락처, 이메일을 수집하며, 해당 정보는 목적 달성 후 안전하게 파기됩니다.
                    </p>
                    <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        className="w-4 h-4 accent-[#176B52] rounded"
                      />
                      <span className="text-xs font-bold text-gray-900">
                        개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      disabled={submitting}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      이전으로
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow disabled:opacity-50 transition-all"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>신청 접수 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>신청 완료하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Detail Overview State */
                <>
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
                      onClick={closeModal}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      닫기
                    </button>
                    <button
                      type="button"
                      onClick={handleStartApply}
                      className="px-6 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>온라인 참가지원 신청</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
