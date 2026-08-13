"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminInquiries, deleteInquiry } from "@/lib/admin/inquiries";
import { InquiryDbRow } from "@/types/inquiry";
import { Search, MessageSquare, Edit2, Trash2, Eye, EyeOff, Mail, Phone, Lock, Calendar } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maskPrivacy, setMaskPrivacy] = useState<boolean>(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getAdminInquiries({
        type: typeFilter || undefined,
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setInquiries(data);
    } catch (e) {
      console.error(e);
      alert("문의·제보 목록을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [typeFilter, statusFilter, searchQuery]);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `정말 "${title}" 문의·제보를 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`
    );
    if (!confirmed) return;

    try {
      await deleteInquiry(id);
      alert("문의·제보 내역이 삭제되었습니다.");
      fetchInquiries();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "확인중":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
            확인중
          </span>
        );
      case "처리중":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
            처리중
          </span>
        );
      case "답변완료":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800">
            답변완료
          </span>
        );
      case "접수":
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-800">
            접수
          </span>
        );
    }
  };

  const maskPhone = (phoneStr?: string | null) => {
    if (!phoneStr) return "-";
    if (!maskPrivacy) return phoneStr;
    return phoneStr.replace(/(\d{3})-\d{3,4}-(\d{4})/, "$1-****-$2");
  };

  const maskEmail = (emailStr?: string | null) => {
    if (!emailStr) return "-";
    if (!maskPrivacy) return emailStr;
    const parts = emailStr.split("@");
    if (parts.length < 2) return emailStr;
    const name = parts[0];
    const maskedName = name.length > 2 ? name.slice(0, 2) + "***" : name + "***";
    return `${maskedName}@${parts[1]}`;
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
          <h1 className="text-2xl font-extrabold text-gray-900">문의 및 비밀 제보함</h1>
          <p className="text-sm text-gray-500 mt-1">
            시민 1:1 문의 및 제보 내역을 확인하고 처리 상태를 관리합니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMaskPrivacy(!maskPrivacy)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors self-start sm:self-auto"
        >
          {maskPrivacy ? (
            <>
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>개인정보 마스킹 해제</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4 text-gray-500" />
              <span>개인정보 마스킹 적용</span>
            </>
          )}
        </button>
      </div>

      {/* Security Privacy Notice Box */}
      <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            보안 안내: 본 수신함의 개인정보는 RLS 정책에 의해 지정된 담당자 외 외부/공개 접근이 철저히 제한됩니다.
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-50/50 flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="제목, 내용, 제보자 이름, 이메일, 연락처 검색"
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
            <option value="">전체 유형</option>
            <option value="일반문의">일반문의</option>
            <option value="지역현안 제보">지역현안 제보</option>
            <option value="행정·정책 제보">행정·정책 제보</option>
            <option value="환경문제">환경문제</option>
            <option value="시민권익">시민권익</option>
            <option value="기타">기타</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 상태</option>
            <option value="접수">접수</option>
            <option value="확인중">확인중</option>
            <option value="처리중">처리중</option>
            <option value="답변완료">답변완료</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          문의·제보 목록을 불러오는 중입니다...
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700">접수된 문의·제보가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">제목 / 내용</th>
                  <th className="px-4 py-3.5">유형</th>
                  <th className="px-4 py-3.5">제보자 / 연락처</th>
                  <th className="px-4 py-3.5">상태</th>
                  <th className="px-4 py-3.5">접수일</th>
                  <th className="px-6 py-3.5 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-1">{item.content}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                      <div className="font-bold text-gray-900 mb-0.5">{item.name}</div>
                      {item.phone && (
                        <div className="flex items-center gap-1 font-mono text-gray-500">
                          <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{maskPhone(item.phone)}</span>
                        </div>
                      )}
                      {item.email && (
                        <div className="flex items-center gap-1 font-mono text-gray-500">
                          <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{maskEmail(item.email)}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(item.created_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/admin/inquiries/${item.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>상세/처리</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
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
