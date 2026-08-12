"use client";

import React from "react";
import SubHero from "@/components/SubHero";
import SubPageNav from "@/components/SubPageNav";
import { ORGANIZATION_DATA } from "@/data/organization";
import { Crown, ShieldCheck, ArrowDown, Users2, Layers, Briefcase, Award } from "lucide-react";

export default function OrganizationPage() {
  return (
    <div>
      {/* Sub Hero */}
      <SubHero
        title={ORGANIZATION_DATA.pageTitle}
        category={ORGANIZATION_DATA.category}
        subtitle={ORGANIZATION_DATA.highlightQuote}
        breadcrumbItems={[
          { name: "시민연대 소개", href: "/about/greeting" },
          { name: ORGANIZATION_DATA.pageTitle },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Title Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#176B52]/10 text-[#176B52] text-xs font-extrabold tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            ORGANIZATION CHART
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">
            무안 자치주권시민연대 조직 체계
          </h2>
          <p className="text-sm text-[#666666] mt-2 font-medium">
            민주적 총회를 최상위 기구로 기획, 정책, 환경, 청년 등 각 분야 위원회가 민주적으로 소통합니다.
          </p>
        </div>

        {/* 1. TOP ASSEMBLY (최상위 총회) */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#0D4938] text-white px-10 py-5 rounded-2xl shadow-lg border border-[#176B52] text-center w-full max-w-md transform hover:scale-[1.02] transition-transform">
            <span className="text-[11px] text-[#F2B544] font-extrabold uppercase tracking-wider block mb-1">
              최상위 의결기구
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight">총회</h3>
            <p className="text-xs text-emerald-200 mt-1">무안 자치주권시민연대 회원 전체</p>
          </div>
          <ArrowDown className="w-6 h-6 text-[#176B52] my-3 animate-bounce" />
        </div>

        {/* 2. REPRESENTATIVES & AUDITORS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          {/* Joint Representatives (8 cols) */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <Crown className="w-5 h-5 text-[#F2B544]" />
              <h4 className="text-lg font-bold text-[#222222]">
                {ORGANIZATION_DATA.jointRepresentatives.title}
              </h4>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#176B52]/10 rounded-2xl border border-[#176B52]/20 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#176B52] uppercase bg-white px-2.5 py-1 rounded-md shadow-xs">
                  {ORGANIZATION_DATA.jointRepresentatives.standingRep.roleTitle}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#0D4938]">
                  {ORGANIZATION_DATA.jointRepresentatives.standingRep.name}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 block mb-2">공동대표</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ORGANIZATION_DATA.jointRepresentatives.coReps.map((rep, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                      <span className="text-sm font-bold text-[#222222]">{rep.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Auditors (4 cols) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <ShieldCheck className="w-5 h-5 text-[#2878A7]" />
                <h4 className="text-lg font-bold text-[#222222]">
                  {ORGANIZATION_DATA.auditors.title}
                </h4>
              </div>

              <div className="space-y-2">
                {ORGANIZATION_DATA.auditors.members.map((aud, idx) => (
                  <div key={idx} className="p-3 bg-[#2878A7]/10 rounded-xl flex items-center justify-between border border-[#2878A7]/20">
                    <span className="text-xs font-bold text-[#2878A7]">감사</span>
                    <span className="text-sm font-bold text-[#222222]">{aud.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">
              사업 및 회계 투명성 검증
            </p>
          </div>
        </div>

        {/* 3. ADVISORY GROUPS (고문단 & 자문위원회 - 별도 자문 조직) */}
        <div className="bg-[#F7F7F3] rounded-3xl p-6 sm:p-8 border border-gray-200/80 mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#176B52]" />
            <h4 className="text-lg font-bold text-[#222222]">
              자문 및 기획 지원 기구 (독립 지원 조직)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 고문단 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-xs">
              <h5 className="text-sm font-bold text-[#176B52] mb-3 flex items-center justify-between">
                <span>{ORGANIZATION_DATA.advisoryGroup.advisors.title}</span>
                <span className="text-xs font-semibold text-gray-400">어르신 및 지역 원로</span>
              </h5>
              <div className="p-3 bg-[#176B52]/10 rounded-xl mb-3 flex items-center justify-between border border-[#176B52]/20">
                <span className="text-xs font-bold text-[#176B52]">
                  {ORGANIZATION_DATA.advisoryGroup.advisors.standingAdvisor.roleTitle}
                </span>
                <span className="text-sm font-bold text-[#0D4938]">
                  {ORGANIZATION_DATA.advisoryGroup.advisors.standingAdvisor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-medium self-center">고문:</span>
                {ORGANIZATION_DATA.advisoryGroup.advisors.members.map((name, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-700">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* 자문위원회 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-xs">
              <h5 className="text-sm font-bold text-[#2878A7] mb-3 flex items-center justify-between">
                <span>{ORGANIZATION_DATA.advisoryGroup.consultants.title}</span>
                <span className="text-xs font-semibold text-gray-400">분야별 전문가 자문</span>
              </h5>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {ORGANIZATION_DATA.advisoryGroup.consultants.members.map((name, idx) => (
                  <div key={idx} className="p-3 bg-[#2878A7]/10 rounded-xl text-center border border-[#2878A7]/20">
                    <span className="text-xs text-[#2878A7] block font-medium">자문위원</span>
                    <span className="text-sm font-bold text-[#222222]">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. CORE EXECUTIVE AXIS (운영위원회 -> 집행위원회 -> 사무처) */}
        <div className="flex flex-col items-center mb-10">
          <ArrowDown className="w-6 h-6 text-[#176B52] mb-3" />
          <div className="bg-[#176B52] text-white px-8 py-4 rounded-2xl shadow-md text-center w-full max-w-md mb-3">
            <span className="text-xs text-emerald-200 block font-semibold">의결 집행 심의</span>
            <h4 className="text-xl font-bold">{ORGANIZATION_DATA.executiveLine.steeringCommittee}</h4>
          </div>

          <ArrowDown className="w-6 h-6 text-[#176B52] my-3" />

          {/* Executive Committee & Secretariat Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
            <div className="bg-white p-6 rounded-2xl border-2 border-[#176B52] text-center shadow-md">
              <span className="text-xs font-bold text-[#176B52] uppercase block mb-1">
                {ORGANIZATION_DATA.executiveLine.executiveCommittee.title}
              </span>
              <h5 className="text-lg font-extrabold text-[#222222]">
                {ORGANIZATION_DATA.executiveLine.executiveCommittee.headName}
              </h5>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#2878A7] text-center shadow-md">
              <span className="text-xs font-bold text-[#2878A7] uppercase block mb-1">
                {ORGANIZATION_DATA.executiveLine.secretariat.title}
              </span>
              <h5 className="text-lg font-extrabold text-[#222222]">
                {ORGANIZATION_DATA.executiveLine.secretariat.headName}
              </h5>
            </div>
          </div>
        </div>

        {/* 5. EXECUTIVE SUB COMMITTEES (집행위원회 산하 8개 위원회 카드) */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Users2 className="w-5 h-5 text-[#176B52]" />
            <h4 className="text-xl font-extrabold text-[#222222]">
              집행위원회 산하 전문 분과위원회 (8개 위원회)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORGANIZATION_DATA.committees.map((com, idx) => (
              <div
                key={idx}
                className="bg-[#F7F7F3] p-5 rounded-2xl border border-gray-200/80 hover:bg-white hover:shadow-md hover:border-[#176B52] transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#176B52] bg-[#176B52]/10 px-2 py-0.5 rounded">
                    분과
                  </span>
                  <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-[#176B52] transition-colors" />
                </div>
                <h5 className="text-sm font-bold text-[#222222] mb-2 leading-snug group-hover:text-[#176B52]">
                  {com.name}
                </h5>
                <p className="text-xs text-gray-500 font-medium">
                  위원장: <span className="font-bold text-[#222222]">{com.headName}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subpage Nav */}
        <SubPageNav currentId="organization" />
      </div>
    </div>
  );
}
