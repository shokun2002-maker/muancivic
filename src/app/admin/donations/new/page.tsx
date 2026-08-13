"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DonationForm from "@/components/admin/DonationForm";
import { createDonation } from "@/lib/admin/donations";
import { DonationDbRow } from "@/types/donation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewDonationPage() {
  const router = useRouter();

  const handleSubmit = async (
    payload: Omit<DonationDbRow, "id" | "created_at">
  ) => {
    await createDonation(payload);
    alert("신규 후원 내역이 등록되었습니다.");
    router.push("/admin/donations");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/donations"
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">신규 후원 내역 등록</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            정기후원 및 일시후원 신청/입금 내역을 수동으로 등록합니다.
          </p>
        </div>
      </div>

      <DonationForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/donations")}
      />
    </div>
  );
}
