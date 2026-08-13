"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FilterBar from "@/components/FilterBar";
import StatusBadge from "@/components/StatusBadge";
import CategoryBadge from "@/components/CategoryBadge";
import VoiceFormModal from "@/components/VoiceFormModal";
import { getPublishedVoices } from "@/lib/data/voices";
import { VOICE_CATEGORIES, CitizenVoice } from "@/data/voices";
import { MessageSquare, MessageSquarePlus, ThumbsUp, Calendar, User, ChevronRight, Loader2, AlertCircle } from "lucide-react";

export default function VoicesListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [voices, setVoices] = useState<CitizenVoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPublishedVoices();
      setVoices(data);
      setLoading(false);
    }
    loadData();
  }, []);

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

  const filteredVoices = voices.filter((item) => {
    if (activeCategory === "전체") return true;
    return item.category === activeCategory;
  });

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="무안 이슈"
        category="무안 이슈"
        subtitle="시민의 눈으로 무안을 살펴보고, 시민의 목소리로 대안을 만들어갑니다."
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "시민의 목소리" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <MessageSquare className="w-4 h-4" />
              CITIZEN PROPOSALS
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              시민의 목소리
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              무안의 변화는 시민의 목소리에서 시작됩니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-sm rounded-2xl shadow hover:shadow-md transition-all active:scale-[0.98]"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>내 목소리 남기기</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mb-10">
          <FilterBar
            categories={VOICE_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Loading / Voices Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-500">시민의 목소리를 읽어오고 있습니다...</p>
          </div>
        ) : filteredVoices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVoices.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <CategoryBadge category={item.category} />
                    <StatusBadge status={item.status} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                    "{item.title}"
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-6">
                    {item.content}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs mb-4">
                    <span className="flex items-center gap-1 text-gray-500 font-medium">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      {item.author}
                    </span>

                    <span className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                    <button
                      type="button"
                      onClick={(e) => handleLike(item.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        likedMap[item.id]
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${likedMap[item.id] ? "fill-red-600" : ""}`} />
                      <span>공감 {item.likesCount}</span>
                    </button>

                    <Link
                      href={`/issues/voices/${item.slug}`}
                      className="py-1.5 px-3 bg-[#F7F7F3] group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                    >
                      <span>의견 검토 보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-500">
              등록된 시민의 목소리가 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* Voice Form Modal */}
      <VoiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
