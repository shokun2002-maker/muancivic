"use client";

import React, { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const popularKeywords = ["군공항 이전", "의료폐기물", "송전선로", "시민제안", "정관", "창립선언문"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`'${query}' 검색어를 기반으로 모니터링 자료 및 현안을 검색합니다.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#F7F7F3]">
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider">
            통합 검색 (무안 현안 · 소식 · 정책자료)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="p-4 sm:p-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="무안의 현안, 활동소식, 키워드를 검색해보세요..."
              className="w-full pl-12 pr-24 py-4 text-base sm:text-lg bg-gray-50 border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:bg-white transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold rounded-lg text-sm transition-colors flex items-center gap-1"
            >
              <span>검색</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold text-[#666666] mb-2.5">인기 검색 현안</p>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => {
                    setQuery(kw);
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-[#176B52]/10 hover:text-[#176B52] text-xs font-medium text-gray-700 rounded-full transition-colors"
                >
                  #{kw}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
