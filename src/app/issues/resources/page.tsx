"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FilterBar from "@/components/FilterBar";
import SearchInput from "@/components/SearchInput";
import CategoryBadge from "@/components/CategoryBadge";
import { getPublishedResources } from "@/lib/data/resources";
import { RESOURCE_CATEGORIES, PolicyResource } from "@/data/resources";
import { BookOpen, Calendar, Building2, Download, FileText, ChevronRight, Loader2 } from "lucide-react";

export default function ResourcesListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<PolicyResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPublishedResources();
      setResources(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredResources = resources.filter((item) => {
    const matchesCategory =
      activeCategory === "전체" || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleDownloadSample = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`'${title}' 파일 다운로드 시연입니다. (실제 첨부파일 연동 예정)`);
  };

  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title="무안 이슈"
        category="무안 이슈"
        subtitle="시민의 눈으로 무안을 살펴보고, 시민의 목소리로 대안을 만들어갑니다."
        breadcrumbItems={[
          { name: "무안 이슈", href: "/issues/current" },
          { name: "정책자료실" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              POLICY RESEARCH & RESOURCES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222]">
              정책자료실
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2 font-medium">
              자료를 공개하고, 정보를 나누고, 시민과 함께 대안을 찾습니다.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
          <FilterBar
            categories={RESOURCE_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="자료 제목, 키워드, 출처 검색..."
          />
        </div>

        {/* Loading / Resources Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-500">정책 자료를 읽어오고 있습니다...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <CategoryBadge category={item.category} />
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                      {item.fileFormat} | {item.fileSize}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-[#666666] gap-2 mb-4">
                    <span className="flex items-center gap-1 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      {item.source}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                    <button
                      type="button"
                      onClick={(e) => handleDownloadSample(item.title, e)}
                      className="px-3.5 py-2 bg-gray-100 hover:bg-[#176B52] hover:text-white text-gray-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>자료 다운로드</span>
                    </button>

                    <Link
                      href={`/issues/resources/${item.slug}`}
                      className="px-3.5 py-2 bg-[#176B52]/10 group-hover:bg-[#176B52] text-[#176B52] group-hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                    >
                      <span>자세히 보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-500">
              검색 조건에 맞는 정책자료가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
