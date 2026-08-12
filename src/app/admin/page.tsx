"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { getPublishedIssues } from "@/lib/data/issues";
import { getLatestActivities } from "@/lib/data/posts";
import { getPublishedResources } from "@/lib/data/resources";
import { IssueArticle } from "@/data/issues";
import { ActivityPost } from "@/data/activities";
import { PolicyResource } from "@/data/resources";
import {
  FileText,
  Compass,
  BookOpen,
  MessageSquare,
  Users,
  Heart,
  HelpCircle,
  ChevronRight,
  Calendar,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [issues, setIssues] = useState<IssueArticle[]>([]);
  const [activities, setActivities] = useState<ActivityPost[]>([]);
  const [resources, setResources] = useState<PolicyResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [issuesData, activitiesData, resourcesData] = await Promise.all([
          getPublishedIssues(),
          getLatestActivities(),
          getPublishedResources(),
        ]);

        setIssues(issuesData);
        setActivities(activitiesData);
        setResources(resourcesData);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <AdminPageHeader
        title="관리자 대시보드"
        description="무안 자치주권시민연대 홈페이지 운영 현황 및 최신 소식을 모니터링합니다."
      />

      {/* 7 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatCard
          title="전체 게시글"
          value={loading ? "..." : activities.length}
          icon={<FileText className="w-6 h-6" />}
          badge="활동소식"
          description="최근 게시글 작성 기준"
        />

        <AdminStatCard
          title="주요 현안"
          value={loading ? "..." : issues.length}
          icon={<Compass className="w-6 h-6" />}
          badge="상시 모니터링"
          description="무안 관내 핵심 의제"
        />

        <AdminStatCard
          title="정책자료"
          value={loading ? "..." : resources.length}
          icon={<BookOpen className="w-6 h-6" />}
          badge="PDF/자료집"
          description="연구 및 성명 자료집"
        />

        <AdminStatCard
          title="시민의 목소리"
          value={6}
          icon={<MessageSquare className="w-6 h-6" />}
          badge="공감 폼"
          description="주민 제안 및 의견"
        />

        <AdminStatCard
          title="회원 (정/준/후원)"
          value="-"
          icon={<Users className="w-6 h-6" />}
          badge="준비 중"
          badgeColor="bg-gray-100 text-gray-500"
          description="다음 단계 DB 연결 예정"
        />

        <AdminStatCard
          title="후원회원"
          value="-"
          icon={<Heart className="w-6 h-6" />}
          badge="준비 중"
          badgeColor="bg-gray-100 text-gray-500"
          description="결제 및 기부금 관리"
        />

        <AdminStatCard
          title="문의·제보"
          value="-"
          icon={<HelpCircle className="w-6 h-6" />}
          badge="준비 중"
          badgeColor="bg-gray-100 text-gray-500"
          description="1:1 미공개 보안 제보함"
        />
      </div>

      {/* Recent Content Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* 1. 최근 활동소식 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-base font-extrabold text-[#222222] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#176B52]" />
                최근 활동소식
              </h3>
              <Link
                href="/admin/posts"
                className="text-xs font-bold text-[#176B52] hover:underline flex items-center gap-0.5"
              >
                <span>전체보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#F7F7F3] rounded-2xl border border-gray-100 hover:border-[#176B52]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1">
                      <span className="text-[#176B52] font-bold">{item.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#222222] line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            ) : (
              <AdminEmptyState title="등록된 활동소식이 없습니다." />
            )}
          </div>
        </div>

        {/* 2. 최근 주요 현안 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-base font-extrabold text-[#222222] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2878A7]" />
                최근 주요 현안
              </h3>
              <Link
                href="/admin/issues"
                className="text-xs font-bold text-[#176B52] hover:underline flex items-center gap-0.5"
              >
                <span>전체보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {issues.length > 0 ? (
              <div className="space-y-3">
                {issues.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#F7F7F3] rounded-2xl border border-gray-100 hover:border-[#176B52]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1">
                      <span className="text-[#2878A7] font-bold">{item.category}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-[#176B52] rounded-full text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#222222] line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            ) : (
              <AdminEmptyState title="등록된 주요 현안이 없습니다." />
            )}
          </div>
        </div>

        {/* 3. 최근 정책자료 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-base font-extrabold text-[#222222] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F2B544]" />
                최근 정책자료
              </h3>
              <Link
                href="/admin/resources"
                className="text-xs font-bold text-[#176B52] hover:underline flex items-center gap-0.5"
              >
                <span>전체보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {resources.length > 0 ? (
              <div className="space-y-3">
                {resources.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#F7F7F3] rounded-2xl border border-gray-100 hover:border-[#176B52]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1">
                      <span className="text-amber-700 font-bold">{item.category}</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {item.source}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#222222] line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            ) : (
              <AdminEmptyState title="등록된 정책자료가 없습니다." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
