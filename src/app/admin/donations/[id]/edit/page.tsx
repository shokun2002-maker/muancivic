"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DonationForm from "@/components/admin/DonationForm";
import { getAdminDonationById, updateDonation } from "@/lib/admin/donations";
import { DonationDbRow } from "@/types/donation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditDonationPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [donation, setDonation] = useState<DonationDbRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getAdminDonationById(id);
        if (!data) {
          alert("존재하지 않거나 삭제된 후원 내역입니다.");
          router.push("/admin/donations");
          return;
        }
        setDonation(data);
      } catch (err) {
        console.error(err);
        alert("후원 내역을 불러오는 도중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, router]);

  const handleSubmit = async (
    payload: Omit<DonationDbRow, "id" | "created_at">
  ) => {
    await updateDonation(id, payload);
    alert("후원 정보가 성공적으로 수정되었습니다.");
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
          <h1 className="text-2xl font-extrabold text-gray-900">후원 내역 수정</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            등록된 후원 정보 및 입금 승인 상태를 수정합니다.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
          <p className="text-sm font-semibold text-gray-600">
            후원 데이터를 읽어오는 중입니다...
          </p>
        </div>
      ) : donation ? (
        <DonationForm
          initialData={donation}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/donations")}
        />
      ) : null}
    </div>
  );
}
