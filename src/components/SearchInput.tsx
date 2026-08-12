"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "검색어를 입력하세요...",
}: SearchInputProps) {
  return (
    <div className="relative flex items-center w-full max-w-md">
      <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#176B52] transition-all shadow-xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
