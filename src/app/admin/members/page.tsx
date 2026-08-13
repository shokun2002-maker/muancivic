"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminMembers, deleteMember } from "@/lib/admin/members";
import { MemberProfileDbRow } from "@/types/member";
import { Plus, Edit2, Trash2, Search, Users, Shield, Eye, EyeOff, Mail, Phone, MapPin } from "lucide-react";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberProfileDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maskPrivacy, setMaskPrivacy] = useState<boolean>(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getAdminMembers({
        memberType: typeFilter || undefined,
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setMembers(data);
    } catch (e) {
      console.error(e);
      alert("회원 목록을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [typeFilter, statusFilter, searchQuery]);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `정말 "${name}" 회원을 삭제하시겠습니까?\n삭제된 회원 정보는 복구할 수 없습니다.`
    );
    if (!confirmed) return;

    try {
      await deleteMember(id);
      alert("회원 정보가 삭제되었습니다.");
      fetchMembers();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "승인":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
            승인 (정상)
          </span>
        );
      case "대기":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
            승인 대기
          </span>
        );
      case "휴면":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-700">
            휴면
          </span>
        );
      case "탈퇴":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">
            탈퇴
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

  const maskPhone = (phoneStr?: string | null) => {
    if (!phoneStr) return "-";
    if (!maskPrivacy) return phoneStr;
    // Mask middle digits e.g. 010-****-1234
    return phoneStr.replace(/(\d{3})-\d{3,4}-(\d{4})/, "$1-****-$2");
  };

  const maskEmail = (emailStr: string) => {
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
          <h1 className="text-2xl font-extrabold text-gray-900">회원 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            정회원, 준회원, 후원회원 가입 신청 목록 및 승인 상태를 관리합니다.
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
                <span>개인정보 마스킹 해제</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-gray-500" />
                <span>개인정보 마스킹 적용</span>
              </>
            )}
          </button>

          <Link
            href="/admin/members/new"
            className="inline-flex items-center justify-center gap-2 bg-[#176B52] hover:bg-[#0D4938] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>신규 회원 등록</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-50/50 flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="이름, 이메일, 연락처, 거주지역 검색"
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
            <option value="">전체 회원유형</option>
            <option value="정회원">정회원</option>
            <option value="준회원">준회원</option>
            <option value="후원회원">후원회원</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none text-gray-700"
          >
            <option value="">전체 상태</option>
            <option value="대기">승인 대기</option>
            <option value="승인">승인 (정상)</option>
            <option value="휴면">휴면</option>
            <option value="탈퇴">탈퇴</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          회원 정보를 불러오는 중입니다...
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700">등록된 회원이 없습니다.</p>
          <p className="text-xs text-gray-400 mt-1">상단의 버튼을 눌러 신규 회원을 추가해보세요.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">회원명</th>
                  <th className="px-4 py-3.5">회원 유형</th>
                  <th className="px-4 py-3.5">연락처 / 이메일</th>
                  <th className="px-4 py-3.5">지역</th>
                  <th className="px-4 py-3.5">상태</th>
                  <th className="px-4 py-3.5">가입/승인일</th>
                  <th className="px-6 py-3.5 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-xs font-extrabold px-2.5 py-1 rounded-md ${
                          item.member_type === "정회원"
                            ? "bg-[#176B52]/10 text-[#176B52]"
                            : item.member_type === "준회원"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {item.member_type}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                      <div className="flex items-center gap-1 font-mono text-gray-800">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{maskEmail(item.email)}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1 font-mono text-gray-500 mt-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{maskPhone(item.phone)}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                      {item.region ? (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {item.region}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(item.joined_at || item.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/admin/members/${item.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
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
