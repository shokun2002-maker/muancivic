"use client";

import React from "react";
import AdminPageHeader from "./AdminPageHeader";
import { Wrench } from "lucide-react";

interface Props {
  title: string;
  category: string;
  description: string;
}

export default function AdminPlaceholderPage({ title, category, description }: Props) {
  return (
    <div className="space-y-8">
      <AdminPageHeader title={title} description={description} />

      <div className="bg-white rounded-3xl p-12 sm:p-16 border border-gray-200/80 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#176B52]/10 text-[#176B52] mx-auto flex items-center justify-center">
          <Wrench className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-extrabold rounded-full">
          {category} 관리자 모듈
        </span>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
          이 기능은 다음 단계에서 구현됩니다.
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          현재 단계에서는 관리자 대시보드와 세션 권한 보안 가드가 적용되어 있습니다. 등록, 수정, 삭제(CRUD) 관리 기능은 다음 단계에서 연결됩니다.
        </p>
      </div>
    </div>
  );
}
