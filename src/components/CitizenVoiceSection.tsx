"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_CITIZEN_VOICES, CitizenVoiceItem } from "@/data/mockData";
import { ThumbsUp, MessageSquarePlus, MessageSquare, Tag, ChevronRight } from "lucide-react";
import VoiceFormModal from "./VoiceFormModal";

export default function CitizenVoiceSection() {
  const [voices, setVoices] = useState<CitizenVoiceItem[]>(MOCK_CITIZEN_VOICES);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLikedMap((prev) => {
      const isAlreadyLiked = prev[id];
      const newStatus = !isAlreadyLiked;

      setVoices((prevVoices) =>
        prevVoices.map((v) =>
          v.id === id
            ? { ...v, likesCount: newStatus ? v.likesCount + 1 : v.likesCount - 1 }
            : v
        )
      );

      return { ...prev, [id]: newStatus };
    });
  };

  const getSlugById = (id: string) => {
    if (id.includes("1")) return "transport-connect";
    if (id.includes("2")) return "youth-jobs";
    return "village-facility";
  };

  return (
    <section id="citizen-voice" className="py-16 sm:py-24 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              CITIZEN PROPOSALS
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              시민의 목소리
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
              무안의 변화는 시민의 목소리에서 시작됩니다.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Link
              href="/issues/voices"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#176B52] hover:text-[#0D4938]"
            >
              <span>전체 제안 보기</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs sm:text-sm rounded-xl shadow hover:shadow-md transition-all active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>내 목소리 남기기</span>
            </button>
          </div>
        </div>

        {/* Proposals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {voices.map((item) => {
            const slug = getSlugById(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2878A7] bg-[#2878A7]/10 px-2.5 py-1 rounded-md">
                      <Tag className="w-3 h-3" />
                      분류: {item.category}
                    </span>
                    <span className="text-xs text-[#666666] font-medium">{item.date}</span>
                  </div>

                  <Link href={`/issues/voices/${slug}`}>
                    <h3 className="text-lg font-bold text-[#222222] hover:text-[#176B52] transition-colors leading-snug mb-4 line-clamp-3">
                      "{item.title}"
                    </h3>
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#666666]">
                  <span className="font-medium">{item.author}</span>

                  <button
                    type="button"
                    onClick={(e) => handleLike(item.id, e)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all ${
                      likedMap[item.id]
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${likedMap[item.id] ? "fill-red-600" : ""}`} />
                    <span>공감 {item.likesCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <VoiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
