import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MediaAlbum } from "@/data/media";
import { Camera, Play, Calendar, ChevronRight, Info } from "lucide-react";

interface Props {
  albums: MediaAlbum[];
}

export default function GallerySection({ albums }: Props) {
  const mediaList = albums.slice(0, 4);

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
            href="/news/media"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#176B52] hover:text-[#0D4938] group"
          >
            <span>전체 갤러리 보기</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Empty State */}
        {mediaList.length === 0 ? (
          <div className="bg-[#F7F7F3] rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto space-y-3">
            <Info className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-extrabold text-gray-900">
              등록된 현장 미디어가 없습니다.
            </h3>
            <p className="text-xs text-gray-500">
              시민연대 주요 소식 사진 및 영상이 등록되면 게시됩니다.
            </p>
          </div>
        ) : (
          /* 4 Media Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {mediaList.map((item) => (
              <div
                key={item.id}
                className="bg-[#F7F7F3] rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Media Box */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                  {item.type === "video" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#176B52] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#F2B544] group-hover:text-[#0D4938] transition-all">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm z-10">
                      사진 앨범
                    </div>
                  )}
                </div>

                {/* Card Footer Info */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <Link href={`/news/media/${item.slug}`}>
                    <h3 className="text-sm font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug line-clamp-2 mb-3">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-[#666666] font-medium pt-3 border-t border-gray-100">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
