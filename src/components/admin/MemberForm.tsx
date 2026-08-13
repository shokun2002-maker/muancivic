"use client";

import React, { useState, FormEvent } from "react";
import { MemberProfileDbRow } from "@/types/member";

interface MemberFormProps {
  initialData?: MemberProfileDbRow;
  onSubmit: (
    payload: Omit<MemberProfileDbRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  onCancel?: () => void;
}

export default function MemberForm({
  initialData,
  onSubmit,
  onCancel,
}: MemberFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [region, setRegion] = useState(initialData?.region ?? "");
  const [memberType, setMemberType] = useState<"정회원" | "준회원" | "후원회원">(
    initialData?.member_type ?? "정회원"
  );
  const [status, setStatus] = useState<"대기" | "승인" | "휴면" | "탈퇴">(
    initialData?.status ?? "대기"
  );
  const [joinedAt, setJoinedAt] = useState(
    initialData?.joined_at ? initialData.joined_at.slice(0, 10) : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const payload: Omit<MemberProfileDbRow, "id" | "created_at" | "updated_at"> = {
      auth_user_id: initialData?.auth_user_id ?? null,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      region: region.trim() || null,
      member_type: memberType,
      status,
      joined_at: joinedAt ? new Date(joinedAt).toISOString() : null,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "회원 정보 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="회원 이름 입력"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">휴대전화 번호 (선택)</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-0000-0000"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">거주 지역 (선택)</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="예: 무안군 무안읍 / 남악리"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            회원 유형 <span className="text-red-500">*</span>
          </label>
          <select
            value={memberType}
            onChange={(e) => setMemberType(e.target.value as "정회원" | "준회원" | "후원회원")}
            required
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="정회원">정회원</option>
            <option value="준회원">준회원</option>
            <option value="후원회원">후원회원</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            회원 상태 <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "대기" | "승인" | "휴면" | "탈퇴")}
            required
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="대기">대기 (승인 대기중)</option>
            <option value="승인">승인 (정상 활동)</option>
            <option value="휴면">휴면</option>
            <option value="탈퇴">탈퇴</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">가입일 / 승인일 (선택)</label>
          <input
            type="date"
            value={joinedAt}
            onChange={(e) => setJoinedAt(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-[#176B52] text-white font-semibold text-sm rounded-xl hover:bg-[#0D4938] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
