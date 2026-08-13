"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminDonations, deleteDonation } from "@/lib/admin/donations";
import { DonationDbRow } from "@/types/donation";
import { Plus, Edit2, Trash2, Search, Heart, Eye, EyeOff, Calendar, DollarSign } from "lucide-react";

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maskPrivacy, setMaskPrivacy] = useState<boolean>(false);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const data = await getAdminDonations({
        donationType: typeFilter || undefined,
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setDonations(data);
    } catch (e) {
      console.error(e);
      alert("후원 목록을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [typeFilter, statusFilter, searchQuery]);

  const handleDelete = async (id: string, donorName: string) => {
    const confirmed = window.confirm(
      `정말 "${donorName}" 후원자의 내역을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`
    );
    if (!confirmed) return;

    try {
      await deleteDonation(id);
      alert("후원 내역이 삭제되었습니다.");
      fetchDonations();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "완료":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
            완료 (입금확인)
          </span>
        );
      case "신청":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
            신청 (대기)
          </span>
        );
      case "취소":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">
            취소
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const maskName = (nameStr: string) => {
    if (!maskPrivacy) return nameStr;
    if (nameStr.length <= 2) return nameStr.slice(0, 1) + "*";
    return nameStr.slice(0, 1) + "*".repeat(nameStr.length - 2) + nameStr.slice(-1);
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("ko-KR");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">후원 및 기부금 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            정기후원 및 일시후원 신청/약정 내역과 입금 상태를 관리합니다.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMaskPrivacy(!maskPrivacy)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {maskPrivacy ? (
              <>
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>성명 마스킹 해제</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-gray-500" />
                <span>성명 마스킹 적용</span>
              </>
            )}
          </button>

          <Link
            href="/admin/donations/new"
            className="inline-flex items-center justify-center gap-2 bg-[#176B52] hover:bg-[#0D4938] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>신규 후원 내역 등록</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-50/50 flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="후원자 성명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-sm focus:outline-none text-gray-800"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 후원유형</option>
            <option value="정기후원">정기후원</option>
            <option value="일시후원">일시후원</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 상태</option>
            <option value="신청">신청 (대기)</option>
            <option value="완료">완료 (입금확인)</option>
            <option value="취소">취소</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          후원 내역을 불러오는 중입니다...
        </div>
      ) : donations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700">접수된 후원 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">후원자 성명</th>
                  <th className="px-4 py-3.5">후원 유형</th>
                  <th className="px-4 py-3.5">후원 금액</th>
                  <th className="px-4 py-3.5">상태</th>
                  <th className="px-4 py-3.5">후원/신청 일자</th>
                  <th className="px-6 py-3.5 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                      {maskName(item.donor_name)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-xs font-extrabold px-2.5 py-1 rounded-md ${
                          item.donation_type === "정기후원"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {item.donation_type}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-mono font-bold text-gray-900">
                      {item.amount.toLocaleString()} 원
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(item.donated_at || item.created_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/admin/donations/${item.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>상세/수정</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.donor_name)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-200 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>삭제</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
