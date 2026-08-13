"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FileText,
  Compass,
  Eye,
  BookOpen,
  Camera,
  Calendar,
  MessageSquare,
  Users,
  Heart,
  HelpCircle,
  Settings,
  LogOut,
  X,
  ShieldAlert,
} from "lucide-react";

interface Props {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({ mobileOpen, onCloseMobile }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mobileOpen && e.key === "Escape") {
        onCloseMobile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const navGroups = [
    {
      groupName: "대시보드",
      items: [
        { name: "대시보드 홈", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      groupName: "콘텐츠 관리",
      items: [
        { name: "활동소식", href: "/admin/posts", icon: <FileText className="w-4 h-4" /> },
        { name: "공지사항", href: "/admin/notices", icon: <FileText className="w-4 h-4" /> },
        { name: "성명·논평", href: "/admin/statements", icon: <FileText className="w-4 h-4" /> },
      ],
    },
    {
      groupName: "무안 이슈",
      items: [
        { name: "주요 현안", href: "/admin/issues", icon: <Compass className="w-4 h-4" /> },
        { name: "정책·행정 모니터링", href: "/admin/monitoring", icon: <Eye className="w-4 h-4" /> },
        { name: "정책자료실", href: "/admin/resources", icon: <BookOpen className="w-4 h-4" /> },
      ],
    },
    {
      groupName: "미디어 & 소통",
      items: [
        { name: "사진·영상", href: "/admin/media", icon: <Camera className="w-4 h-4" /> },
        { name: "행사·참여 관리", href: "/admin/events", icon: <Calendar className="w-4 h-4" /> },
        { name: "시민의 목소리", href: "/admin/voices", icon: <MessageSquare className="w-4 h-4" /> },
      ],
    },
    {
      groupName: "회원 및 운영",
      items: [
        { name: "회원 관리", href: "/admin/members", icon: <Users className="w-4 h-4" /> },
        { name: "후원 관리", href: "/admin/donations", icon: <Heart className="w-4 h-4" /> },
        { name: "문의·제보", href: "/admin/inquiries", icon: <HelpCircle className="w-4 h-4" /> },
        { name: "환경설정", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0D4938] text-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-emerald-800/60 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="로고"
            width={32}
            height={32}
            className="h-8 w-auto brightness-0 invert"
          />
          <div>
            <span className="font-extrabold text-sm text-white block leading-tight">
              무안 자치주권시민연대
            </span>
            <span className="text-[10px] text-amber-400 font-bold block leading-tight">
              ADMIN CMS SYSTEM
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-emerald-200 hover:text-white rounded-lg"
          aria-label="메뉴 닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-emerald-800">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider px-3 block mb-2">
              {group.groupName}
            </span>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isActive
                        ? "bg-[#F2B544] text-[#0D4938] shadow-md"
                        : "text-emerald-100/80 hover:bg-emerald-800/60 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Quick Actions */}
      <div className="p-4 border-t border-emerald-800/60 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full py-2.5 px-3 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-xs font-bold rounded-xl transition-colors flex items-center justify-between"
        >
          <span>공개 홈페이지 열기</span>
          <ShieldAlert className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2.5 px-3 bg-red-950/40 hover:bg-red-900/60 text-red-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-between"
        >
          <span>로그아웃</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 shadow-lg z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden animate-fadeIn"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 max-w-[85vw] h-full shadow-2xl animate-slideRight"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
