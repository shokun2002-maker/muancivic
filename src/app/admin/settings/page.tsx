"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getMyAdminProfile,
  updateMyDisplayName,
  getAdminProfiles,
  updateAdminRole,
} from "@/lib/admin/settings";
import { AdminProfileDbRow } from "@/types/admin-profile";
import { AdminRole, canManageSettings } from "@/lib/permission";
import {
  Settings,
  User,
  Shield,
  Key,
  Users,
  CheckCircle2,
  Lock,
  Save,
  Loader2,
  HardDrive,
  Info,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [myProfile, setMyProfile] = useState<AdminProfileDbRow | null>(null);
  const [allProfiles, setAllProfiles] = useState<AdminProfileDbRow[]>([]);
  const [loading, setLoading] = useState(true);

  // My profile state
  const [myDisplayName, setMyDisplayName] = useState("");
  const [savingMyName, setSavingMyName] = useState(false);

  // Editing state for all profiles (super_admin)
  const [editingRoles, setEditingRoles] = useState<{ [id: string]: AdminRole }>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSettingsData = async () => {
    setLoading(true);
    try {
      const myData = await getMyAdminProfile();
      setMyProfile(myData);
      if (myData) {
        setMyDisplayName(myData.display_name);

        // If user is super_admin, fetch all profiles
        if (canManageSettings(myData.role)) {
          const list = await getAdminProfiles();
          setAllProfiles(list);
          const initialRoles: { [id: string]: AdminRole } = {};
          list.forEach((p) => {
            initialRoles[p.id] = p.role;
          });
          setEditingRoles(initialRoles);
        }
      }
    } catch (e) {
      console.error(e);
      alert("환경설정 및 관리자 프로필을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const handleSaveMyName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myDisplayName.trim()) {
      alert("표시할 이름을 입력해 주세요.");
      return;
    }
    setSavingMyName(true);
    try {
      const updated = await updateMyDisplayName(myDisplayName);
      setMyProfile(updated);
      alert("프로필 표시 이름이 변경되었습니다.");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "프로필 수정 중 오류가 발생했습니다.");
    } finally {
      setSavingMyName(false);
    }
  };

  const handleRoleChange = async (profileId: string) => {
    if (!myProfile) return;
    const newRole = editingRoles[profileId];
    if (!newRole) return;

    setUpdatingId(profileId);
    try {
      await updateAdminRole(profileId, newRole, myProfile.auth_user_id);
      alert("관리자 역할이 변경되었습니다.");
      fetchSettingsData();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "역할 변경 중 오류가 발생했습니다.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case AdminRole.super_admin:
        return (
          <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-rose-100 text-rose-800">
            최고 관리자 (super_admin)
          </span>
        );
      case AdminRole.content_admin:
        return (
          <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-blue-100 text-blue-800">
            콘텐츠 관리자 (content_admin)
          </span>
        );
      case AdminRole.member_admin:
        return (
          <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-emerald-100 text-emerald-800">
            회원 관리자 (member_admin)
          </span>
        );
      case AdminRole.operator:
        return (
          <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-amber-100 text-amber-800">
            운영 관리자 (operator)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-800">
            {role}
          </span>
        );
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("ko-KR");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
        <p className="text-sm font-semibold text-gray-600">
          관리자 환경설정을 로딩하는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#176B52]" />
            관리자 환경설정 및 계정 권한
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            내 관리자 프로필, 비밀번호 설정, 관리자 역할 및 시스템 상태를 통합 관리합니다.
          </p>
        </div>
      </div>

      {/* Section 1: My Profile Settings */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <User className="w-5 h-5 text-[#176B52]" />
          <h2 className="text-lg font-extrabold text-gray-900">내 관리자 프로필</h2>
        </div>

        {myProfile ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  현재 부여된 관리자 역할
                </label>
                <div className="pt-1">{getRoleBadge(myProfile.role)}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  계정 등록 일자
                </label>
                <div className="pt-1 text-sm font-mono text-gray-600">
                  {formatDate(myProfile.created_at)}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveMyName} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  관리자 표시 이름 (Display Name) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 max-w-md">
                  <input
                    type="text"
                    required
                    value={myDisplayName}
                    onChange={(e) => setMyDisplayName(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                  <button
                    type="submit"
                    disabled={savingMyName}
                    className="px-4 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {savingMyName ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>프로필 저장</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">비밀번호 변경</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  보안 강화를 위해 주기적으로 비밀번호를 변경해 주세요.
                </p>
              </div>
              <Link
                href="/admin/reset-password"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs"
              >
                <Key className="w-4 h-4 text-[#176B52]" />
                <span>비밀번호 변경 페이지 이동</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">내 프로필 정보를 불러올 수 없습니다.</div>
        )}
      </div>

      {/* Section 2: All Admin Accounts (super_admin only) */}
      {myProfile && canManageSettings(myProfile.role) && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg font-extrabold text-gray-900">
                전체 관리자 계정 현황 (super_admin 전용)
              </h2>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
              최고 관리자 전용 기능
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5">관리자 이름</th>
                  <th className="px-4 py-3.5">Auth UID (축약)</th>
                  <th className="px-4 py-3.5">부여된 역할</th>
                  <th className="px-4 py-3.5">생성일</th>
                  <th className="px-6 py-3.5 text-center">역할 변경</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allProfiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                      {profile.display_name}
                      {profile.auth_user_id === myProfile.auth_user_id && (
                        <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">
                          나
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-gray-500 whitespace-nowrap">
                      {profile.auth_user_id.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={editingRoles[profile.id] ?? profile.role}
                        onChange={(e) =>
                          setEditingRoles({
                            ...editingRoles,
                            [profile.id]: e.target.value as AdminRole,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#176B52] focus:outline-none"
                      >
                        <option value={AdminRole.super_admin}>super_admin (최고 관리자)</option>
                        <option value={AdminRole.content_admin}>content_admin (콘텐츠)</option>
                        <option value={AdminRole.member_admin}>member_admin (회원)</option>
                        <option value={AdminRole.operator}>operator (운영/후원/문의)</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(profile.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => handleRoleChange(profile.id)}
                        disabled={updatingId === profile.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#176B52] rounded-lg text-xs font-semibold text-[#176B52] hover:bg-[#176B52]/10 transition-colors disabled:opacity-50"
                      >
                        {updatingId === profile.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Shield className="w-3.5 h-3.5" />
                        )}
                        <span>역할 저장</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 3: Role Definitions & Permissions Summary */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Info className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-extrabold text-gray-900">관리자 역할별 권한 정의</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1.5">
            <span className="font-extrabold text-xs text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
              super_admin (최고 관리자)
            </span>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              모든 CMS 게시물(소식, 현안, 모니터링, 자료실, 시민목소리, 미디어), 회원 관리, 문의·비밀제보 수신함, 후원 내역 및 시스템 전체 환경설정/관리자 권한 변경 가능.
            </p>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1.5">
            <span className="font-extrabold text-xs text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
              content_admin (콘텐츠 관리자)
            </span>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              활동소식, 주요 현안, 정책·행정 모니터링, 정책자료실, 시민의 목소리, 미디어 갤러리 등의 주요 공익 홍보 콘텐츠 작성 및 관리 가능. (회원/후원/문의 접근 제한)
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
            <span className="font-extrabold text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              member_admin (회원 관리자)
            </span>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              시민연대 회원 프로필, 회원 가입 신청 승인/상태 관리 및 1:1 문의·제보 수신함 처리 가능. (일반 콘텐츠 및 후원 관리 제한)
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1.5">
            <span className="font-extrabold text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              operator (운영 관리자)
            </span>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              후원금 신청/약정 내역 관리 및 1:1 문의·비밀제보 수신함 상세 확인 및 답변 처리 가능.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Read-Only System Security Overview */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Lock className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-extrabold text-white">시스템 보안 및 운영 체계 개요</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Row Level Security (RLS)</span>
            </div>
            <p className="text-slate-300">Supabase RLS 마이그레이션 정책 적용 및 DB 트리거 보안 구동</p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <HardDrive className="w-4 h-4 shrink-0" />
              <span>Storage Media Bucket</span>
            </div>
            <p className="text-slate-300">Supabase Storage `media` 버킷 공개 이미지 저장소 구성</p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Shield className="w-4 h-4 shrink-0" />
              <span>세션 보안 체계</span>
            </div>
            <p className="text-slate-300">Supabase Auth 세션 기반 권한 분리 및 미들웨어 접근 제어</p>
          </div>
        </div>
      </div>
    </div>
  );
}
