import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface AboutPageLink {
  id: string;
  name: string;
  href: string;
}

export const ABOUT_SUB_PAGES: AboutPageLink[] = [
  { id: "greeting", name: "방문 환영 인사", href: "/about/greeting" },
  { id: "declaration", name: "창립선언문", href: "/about/declaration" },
  { id: "rules", name: "정관", href: "/about/rules" },
  { id: "history", name: "걸어온 길", href: "/about/history" },
  { id: "organization", name: "조직도", href: "/about/organization" },
];

interface SubPageNavProps {
  currentId: string;
}

export default function SubPageNav({ currentId }: SubPageNavProps) {
  const currentIndex = ABOUT_SUB_PAGES.findIndex((p) => p.id === currentId);
  const prevPage = currentIndex > 0 ? ABOUT_SUB_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < ABOUT_SUB_PAGES.length - 1 ? ABOUT_SUB_PAGES[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      {/* 5 Subpages Navigation Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 mb-8">
        <p className="text-xs font-bold text-[#176B52] uppercase tracking-wider mb-3 px-2">
          시민연대 소개 서브 메뉴
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ABOUT_SUB_PAGES.map((page) => {
            const isActive = page.id === currentId;
            return (
              <Link
                key={page.id}
                href={page.href}
                className={`text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[#176B52] text-white shadow"
                    : "bg-gray-50 hover:bg-gray-100 text-[#444444]"
                }`}
              >
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Prev / Next Page Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200/80 hover:border-[#176B52] hover:shadow-md transition-all group"
          >
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-[#176B52] group-hover:text-white transition-colors text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">이전 페이지</span>
              <span className="text-sm font-bold text-[#222222] group-hover:text-[#176B52] transition-colors">
                {prevPage.name}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPage ? (
          <Link
            href={nextPage.href}
            className="flex items-center justify-between sm:justify-end gap-3 p-4 bg-white rounded-xl border border-gray-200/80 hover:border-[#176B52] hover:shadow-md transition-all group text-right"
          >
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">다음 페이지</span>
              <span className="text-sm font-bold text-[#222222] group-hover:text-[#176B52] transition-colors">
                {nextPage.name}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-[#176B52] group-hover:text-white transition-colors text-gray-600">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
