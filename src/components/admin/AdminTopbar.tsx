"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminProfile, getRoleLabel } from "@/lib/auth/admin";
import { Menu, LogOut, User, Shield } from "lucide-react";

interface Props {
  adminProfile: AdminProfile | null;
  onOpenMobileMenu: () => void;
}

export default function AdminTopbar({ adminProfile, onOpenMobileMenu }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.push("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="관리자 메뉴 열기"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Shield className="w-4 h-4 text-[#176B52]" />
          <span>무안 자치주권시민연대 통합 관리자 시스템</span>
        </div>
      </div>

      {adminProfile && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200/60">
            <div className="w-7 h-7 rounded-full bg-[#176B52] text-white flex items-center justify-center text-xs font-bold">
              <User className="w-4 h-4" />
            </div>

            <div className="text-left">
              <span className="text-xs font-extrabold text-[#222222] block leading-tight">
                {adminProfile.display_name}
              </span>
              <span className="text-[10px] text-[#176B52] font-bold block leading-tight">
                {getRoleLabel(adminProfile.role)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-bold text-xs rounded-xl transition-colors border border-gray-200/60"
            title="로그아웃"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      )}
    </header>
  );
}
