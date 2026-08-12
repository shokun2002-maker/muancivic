"use client";

import React from "react";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function FilterBar({
  categories,
  activeCategory,
  onSelectCategory,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = cat === activeCategory;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all whitespace-nowrap ${
              isActive
                ? "bg-[#176B52] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
