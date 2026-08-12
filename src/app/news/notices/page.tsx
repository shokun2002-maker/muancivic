"use client";

import React, { useState } from "react";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import SearchInput from "@/components/SearchInput";
import CategoryBadge from "@/components/CategoryBadge";
import { NOTICES_DATA } from "@/data/notices";
import { Bell, Eye, Calendar, ChevronRight } from "lucide-react";

export default function NoticesListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = NOTICES_DATA.filter(
    (n) =>
      searchQuery.trim() === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="시민연대 소식"
        category="시민연대 소식"
        subtitle="시민이 움직이면 무안이 달라집니다."
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "공지사항" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4" />
              ANNOUNCEMENTS & NOTICES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              공지사항
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              무안 자치주권시민연대의 주요 알림 및 모임 소식입니다.
            </p>
          </div>

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="공지사항 제목, 검색어 입력..."
          />
        </div>

        {/* Text-Centric Notice Table / List UI */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          {/* Table Header (Desktop) */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-4 bg-[#F7F7F3] border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="sm:col-span-1 text-center">번호</div>
            <div className="sm:col-span-2 text-center">분류</div>
            <div className="sm:col-span-6">제목</div>
            <div className="sm:col-span-2 text-center">작성일</div>
            <div className="sm:col-span-1 text-center">조회수</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {filteredNotices.map((item) => (
              <Link
                key={item.id}
                href={`/news/notices/${item.slug}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 hover:bg-[#176B52]/5 transition-colors items-center group cursor-pointer"
              >
                <div className="hidden sm:block sm:col-span-1 text-center text-xs font-bold text-gray-400">
                  {item.noticeNum}
                </div>

                <div className="sm:col-span-2 sm:text-center">
                  <CategoryBadge category={item.category} />
                </div>

                <div className="sm:col-span-6">
                  <h3 className="text-sm sm:text-base font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="sm:col-span-2 text-xs text-gray-500 sm:text-center flex items-center justify-between sm:justify-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:hidden text-gray-400" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 sm:hidden text-gray-400">
                    <Eye className="w-3.5 h-3.5" />
                    {item.views}
                  </span>
                </div>

                <div className="hidden sm:flex sm:col-span-1 justify-center items-center gap-1 text-xs text-gray-400 font-medium">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{item.views}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
