"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface Props {
  message?: string;
}

export default function AdminLoading({ message = "관리자 권한 및 데이터를 확인하고 있습니다..." }: Props) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3 p-6 text-center">
      <div className="p-3 bg-[#176B52]/10 rounded-2xl">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin" />
      </div>
      <p className="text-xs sm:text-sm font-bold text-gray-600">{message}</p>
    </div>
  );
}
