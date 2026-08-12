"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/mockData";
import { Camera, Play, Calendar, ChevronRight } from "lucide-react";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              MEDIA & GALLERY
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              시민연대 현장
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
              무안 군민들과 함께하는 현장의 생생한 순간을 사진과 영상으로 전합니다.
            </p>
          </div>

          <Link
            href="/about/history"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#176B52] hover:text-[#0D4938] group"
          >
            <span>시민연대 기록 보기</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#F7F7F3] rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Media Box */}
              <div className="relative aspect-video bg-gradient-to-br from-[#176B52]/20 via-gray-200 to-[#2878A7]/20 flex items-center justify-center overflow-hidden">
                {idx === 0 ? (
                  /* Real Uploaded Photo for First Item */
                  <div className="absolute inset-0">
                    <Image
                      src="/inaugural_assembly.jpg"
                      alt="무안 자치주권 시민연대 창립총회 현장"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[#0D4938]/10 group-hover:bg-black/20 transition-colors" />
                )}

                {item.type === "video" ? (
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[#176B52] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#F2B544] group-hover:text-[#0D4938] transition-all">
                    <Play className="w-6 h-6 ml-1 fill-current" />
                  </div>
                ) : (
                  <div className="relative z-10 p-3 rounded-full bg-white/80 backdrop-blur-sm text-[#176B52] group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                )}

                <span className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm z-10">
                  {item.category}
                </span>

                {idx !== 0 && (
                  <span className="absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    Placeholder Image {idx + 1}
                  </span>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <h3 className="text-base font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug line-clamp-2 mb-3">
                  {idx === 0 ? "2026.07.24 무안 자치주권시민연대 창립총회 기념 촬영" : item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#666666] font-medium pt-3 border-t border-gray-100">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
