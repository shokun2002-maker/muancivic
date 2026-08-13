"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminInquiryById, updateInquiry } from "@/lib/admin/inquiries";
import { InquiryDbRow } from "@/types/inquiry";
import { ArrowLeft, Loader2, Calendar, User, Phone, Mail, Tag, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditInquiryPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [inquiry, setInquiry] = useState<InquiryDbRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("접수");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getAdminInquiryById(id);
        if (!data) {
          alert("존재하지 않거나 삭제된 문의·제보입니다.");
          router.push("/admin/inquiries");
          return;
        }
        setInquiry(data);
        setStatus(data.status);
        setIsPublic(data.is_public ?? false);
      } catch (err) {
        console.error(err);
        alert("문의 데이터를 불러오는 도중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, router]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateInquiry(id, {
        status,
        is_public: isPublic,
      });
      alert("문의 처리 상태가 변경되었습니다.");
      router.push("/admin/inquiries");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "상태 변경 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString("ko-KR");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/inquiries"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">문의·제보 상세 및 처리</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            접수된 1:1 문의 내용을 확인하고 처리 상태를 변경합니다.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
          <p className="text-sm font-semibold text-gray-600">
            문의 데이터를 읽어오는 중입니다...
          </p>
        </div>
      ) : inquiry ? (
        <div className="space-y-6">
          {/* Inquiry Detail Content Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-md">
                <Tag className="w-3.5 h-3.5" />
                분류: {inquiry.type}
              </span>

              <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                접수시각: {formatDate(inquiry.created_at)}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-gray-900 leading-snug mb-3">
                "{inquiry.title}"
              </h2>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {inquiry.content}
              </div>
            </div>

            {/* Reporter Information Section */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                제보자 연락처 정보 (관리자 전용)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                  <User className="w-4 h-4 text-[#176B52]" />
                  <span>이름: {inquiry.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                  <Phone className="w-4 h-4 text-[#176B52]" />
                  <span>연락처: {inquiry.phone || "미입력"}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                  <Mail className="w-4 h-4 text-[#176B52]" />
                  <span>이메일: {inquiry.email || "미입력"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Processing Status Form */}
          <form
            onSubmit={handleStatusUpdate}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4"
          >
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#176B52]" />
              관리자 처리 상태 변경
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  처리 상태 <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                >
                  <option value="접수">접수 (초기 상태)</option>
                  <option value="확인중">확인중</option>
                  <option value="처리중">처리중</option>
                  <option value="답변완료">답변완료</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  사이트 노출 여부
                </label>
                <select
                  value={isPublic ? "true" : "false"}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                >
                  <option value="false">비공개 (기본값, 1:1 비밀 제보)</option>
                  <option value="true">공개 (공동 게시판 노출 허용 시)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <Link
                href="/admin/inquiries"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#176B52] text-white font-semibold text-sm rounded-xl hover:bg-[#0D4938] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "저장 중..." : "상태 변경 저장"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
