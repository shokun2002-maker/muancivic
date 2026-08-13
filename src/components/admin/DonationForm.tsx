"use client";

import React, { useState, FormEvent } from "react";
import { DonationDbRow } from "@/types/donation";

interface DonationFormProps {
  initialData?: DonationDbRow;
  onSubmit: (
    payload: Omit<DonationDbRow, "id" | "created_at">
  ) => Promise<void>;
  onCancel?: () => void;
}

export default function DonationForm({
  initialData,
  onSubmit,
  onCancel,
}: DonationFormProps) {
  const [donorName, setDonorName] = useState(initialData?.donor_name ?? "");
  const [donationType, setDonationType] = useState<"정기후원" | "일시후원">(
    initialData?.donation_type ?? "정기후원"
  );
  const [amount, setAmount] = useState<number>(initialData?.amount ?? 20000);
  const [status, setStatus] = useState<string>(initialData?.status ?? "완료");
  const [donatedAt, setDonatedAt] = useState(
    initialData?.donated_at ? initialData.donated_at.slice(0, 10) : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const payload: Omit<DonationDbRow, "id" | "created_at"> = {
      member_id: initialData?.member_id ?? null,
      donor_name: donorName.trim(),
      donation_type: donationType,
      amount: Number(amount) || 0,
      status,
      donated_at: donatedAt ? new Date(donatedAt).toISOString() : null,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "후원 정보 저장 중 오류가 발생했습니다.");
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
            후원자 성명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
            placeholder="후원자 이름 입력"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            후원 유형 <span className="text-red-500">*</span>
          </label>
          <select
            value={donationType}
            onChange={(e) => setDonationType(e.target.value as "정기후원" | "일시후원")}
            required
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="정기후원">정기후원</option>
            <option value="일시후원">일시후원</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            후원 금액 (원) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={1000}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            placeholder="예: 20000"
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            후원 상태 <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#176B52] focus:outline-none text-sm"
          >
            <option value="신청">신청 (대기)</option>
            <option value="완료">완료 (입금확인)</option>
            <option value="취소">취소</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">후원/입금 일자 (선택)</label>
          <input
            type="date"
            value={donatedAt}
            onChange={(e) => setDonatedAt(e.target.value)}
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
