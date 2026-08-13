"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CitizenVoice } from "@/data/voices";
import { ThumbsUp, MessageSquarePlus, MessageSquare, Tag, ChevronRight, Info } from "lucide-react";
import VoiceFormModal from "./VoiceFormModal";

interface Props {
  voices: CitizenVoice[];
}

export default function CitizenVoiceSection({ voices: initialVoices }: Props) {
  const [voices, setVoices] = useState<CitizenVoice[]>(initialVoices.slice(0, 3));
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
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>의견 제안하기</span>
            </button>
            <Link
              href="/issues/voices"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176B52] hover:text-[#0D4938] group"
            >
              <span>전체보기</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {voices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto space-y-3">
            <Info className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-extrabold text-gray-900">
              등록된 시민의 목소리가 없습니다.
            </h3>
            <p className="text-xs text-gray-500">
              무안의 발전을 위한 시민 여러분의 의견과 제안을 남겨주세요.
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {voices.map((v) => {
              const isLiked = likedMap[v.id];
              return (
                <div
                  key={v.id}
                  className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {v.category}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                        {v.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3 line-clamp-2">
                      {v.title}
                    </h3>

                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-6">
                      {v.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <span>{v.author}</span>
                      <span>•</span>
                      <span>{v.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleLike(v.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isLiked
                          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-600" : ""}`} />
                      <span>{v.likesCount}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Proposal Form Modal */}
        <VoiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
}
