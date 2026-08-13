"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import Lightbox from "@/components/Lightbox";
import ShareButtons from "@/components/ShareButtons";
import { MediaAlbum } from "@/data/media";
import { ChevronLeft, Calendar, Camera, Play, Video, ZoomIn } from "lucide-react";

export default function MediaDetailClient({ album }: { album: MediaAlbum }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const photos = album.photoList || [album.coverImage];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={album.title}
        category="사진·영상"
        subtitle={album.description}
        breadcrumbItems={[
          { name: "시민연대 소식", href: "/news/activities" },
          { name: "사진·영상", href: "/news/media" },
          { name: album.title },
        ]}
      />

      {/* Main Detail Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/news/media"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:text-[#0D4938] mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>사진·영상 갤러리로 돌아가기</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
              {album.type === "video" ? <Video className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
              {album.type === "video" ? "영상 기록" : "사진 앨범"}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              행사일자: {album.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] leading-tight mb-4">
            {album.title}
          </h1>

          <p className="text-base text-[#666666] leading-relaxed">
            {album.description}
          </p>
        </div>

        {/* Video Player Container / Pending Notice */}
        {album.type === "video" && (
          <div className="bg-black rounded-3xl overflow-hidden aspect-video relative flex flex-col items-center justify-center text-white mb-12 shadow-xl border border-gray-800">
            <Image
              src={album.coverImage}
              alt={album.title}
              fill
              className="object-cover opacity-30"
            />
            <div className="relative z-10 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#176B52] text-white mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 ml-1 fill-current" />
              </div>
              <h3 className="text-lg font-bold mb-2">영상 준비 중입니다</h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                향후 공식 유튜브 채널의 영상 URL 또는 videoId가 연동되면 본 화면에서 실시간 스트리밍으로 감상하실 수 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* Photo Grid Section */}
        {album.type === "photo" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-[#222222] flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#176B52]" />
                앨범 사진 목록 ({photos.length}장)
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                * 사진을 클릭하면 대형 확대 및 갤러리 뷰(Lightbox)가 열립니다.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-xs border border-gray-200 cursor-pointer group"
                >
                  <Image
                    src={src}
                    alt={`${album.title} - ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox UI */}
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
          title={album.title}
        />

        {/* Share Buttons */}
        <ShareButtons title={album.title} />
      </div>
    </div>
  );
}
