import React from "react";
import SubHero from "@/components/SubHero";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div>
      <SubHero
        title="개인정보처리방침"
        category="약관 및 정책"
        subtitle="무안 자치주권시민연대의 개인정보보호 수칙입니다."
        breadcrumbItems={[{ name: "개인정보처리방침" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-[#176B52]">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-xl font-extrabold">개인정보 수집 및 처리 방침 (안내)</h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#333333] leading-relaxed">
            <p>
              무안 자치주권시민연대는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 개인정보보호법 등 관련 법령을 준수하며, 이용자의 개인정보 수집 및 이용에 있어 안전하게 관리합니다.
            </p>
            <p>
              본 개인정보처리방침 문서는 정식 운영에 맞춰 세부 수집 항목(성명, 연락처, 이메일 등) 및 보유 기간, 파기 절차 규정이 최종 확정 고지될 예정입니다.
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
