"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function AdminEmptyState({
  title = "등록된 데이터가 없습니다.",
  description = "아직 추가된 항목이 없거나 조건에 맞는 데이터가 없습니다.",
  actionText,
  onAction,
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-10 border border-gray-200/80 text-center space-y-3 my-4">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
        <FolderOpen className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-[#176B52] hover:bg-[#0D4938] text-white text-xs font-bold rounded-xl shadow transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
