import React from "react";
import Link from "next/link";
import { Home, Compass, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#F7F7F3]">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-[#176B52] border border-[#176B52]/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-4xl font-extrabold text-[#176B52] block tracking-widest font-mono">
            404
          </span>
          <h1 className="text-2xl font-extrabold text-[#222222] mt-2">
            요청하신 페이지를 찾을 수 없습니다
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-3 leading-relaxed font-medium">
            찾으시려는 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다. <br />
            입력하신 주소를 다시 한번 확인해 주세요.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </Link>
          <Link
            href="/issues/current"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-gray-500" />
            <span>주요 현안 보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
