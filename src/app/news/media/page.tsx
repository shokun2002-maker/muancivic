"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubHero from "@/components/SubHero";
import FilterBar from "@/components/FilterBar";
import { MEDIA_DATA, MEDIA_CATEGORIES } from "@/data/media";
import { Camera, Play, Calendar, ChevronRight, Video } from "lucide-react";

export default function MediaListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredMedia = MEDIA_DATA.filter((item) => {
    if (activeCategory === "전체") return true;
    if (activeCategory === "사진") return item.type === "photo";
    if (activeCategory === "영상") return item.type === "video";
    return true;
  });

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="시민연대 소식"
        category="시민연대 소식"
        subtitle="시민이 움직이면 무안이 달라집니다."
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "사진·영상" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4" />
              PHOTO & VIDEO GALLERY
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              사진·영상
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              시민연대의 생생한 활동 현장을 사진과 영상으로 기록합니다.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-10">
          <FilterBar
            categories={MEDIA_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Media Thumbnail */}
                <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                  {item.type === "video" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#176B52] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#F2B544] group-hover:text-[#0D4938] transition-all">
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                      사진 앨범
                    </div>
                  )}

                  {item.isVideoPending && (
                    <div className="absolute bottom-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      영상 준비 중
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>

                  <h3 className="text-base font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/news/media/${item.slug}`}
                  className="w-full py-2.5 px-4 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-between"
                >
                  <span>{item.type === "video" ? "영상 보기" : "앨범 전체보기"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
