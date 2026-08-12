import React from "react";
import SubHero from "@/components/SubHero";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div>
      <SubHero
        title="이용약관"
        category="약관 및 정책"
        subtitle="무안 자치주권시민연대 홈페이지 이용 기본 규정입니다."
        breadcrumbItems={[{ name: "이용약관" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-[#176B52]">
            <FileText className="w-6 h-6" />
            <h2 className="text-xl font-extrabold">홈페이지 서비스 이용약관 (안내)</h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#333333] leading-relaxed">
            <p>
              본 약관은 무안 자치주권시민연대가 제공하는 온라인 시민광장 및 정보 서비스 이용에 관한 권리와 의무, 책임사항을 규정함을 목적으로 합니다.
            </p>
            <p>
              건강한 시민 소통과 공론장의 질서를 위해 타인의 명예 훼손, 비방, 욕설, 상업적 광고 게시글은 정관 및 규약에 따라 제한될 수 있습니다.
            </p>
            <p className="text-xs text-gray-400 pt-4">
              시행일자: 2026년 7월 24일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
