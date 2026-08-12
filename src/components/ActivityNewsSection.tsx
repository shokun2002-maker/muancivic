"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLatestActivities } from "@/lib/data/posts";
import { ActivityPost } from "@/data/activities";
import { Sparkles, Calendar, ArrowRight, ChevronRight, Loader2 } from "lucide-react";

export default function ActivityNewsSection() {
  const [activities, setActivities] = useState<ActivityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getLatestActivities();
      setActivities(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const featuredPost = activities.find((a) => a.isFeatured) || activities[0];
  const sidePosts = activities.filter((a) => a.id !== featuredPost?.id).slice(0, 2);

  return (
    <section id="activities" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              ACTIVITIES & NEWS
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              시민이 움직이면 무안이 달라집니다
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2 font-medium">
              무안 자치주권시민연대의 발걸음과 생생한 활동 현장 소식을 전합니다.
            </p>
          </div>

          <Link
            href="/news/activities"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#176B52] hover:text-[#0D4938] group"
          >
            <span>전체 소식 보기</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-500">활동 소식을 읽어오고 있습니다...</p>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Post (Big Card) */}
            {featuredPost && (
              <div className="lg:col-span-7 bg-[#0D4938] rounded-3xl overflow-hidden shadow-xl text-white flex flex-col justify-between border border-[#176B52]/40 group">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-[#F2B544] text-[#0D4938] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    대표 대표소식
                  </div>
                </div>

                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="flex items-center gap-1 text-xs text-emerald-200 font-medium mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug text-white mb-4 group-hover:text-[#F2B544] transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-emerald-100/90 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                      {featuredPost.summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-emerald-800/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-200">
                      무안 자치주권시대 공식 선언 현장
                    </span>
                    <Link
                      href={`/news/activities/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0D4938] hover:bg-[#F2B544] hover:text-[#0D4938] font-bold text-xs rounded-xl transition-all duration-200 shadow"
                    >
                      <span>소식 전문 보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Side Posts List (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {sidePosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#F7F7F3] rounded-3xl p-6 border border-gray-200/80 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-2.5 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                    </div>

                    <h4 className="text-lg font-bold text-[#222222] group-hover:text-[#176B52] transition-colors leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-2 mb-4">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200/60">
                    <Link
                      href={`/news/activities/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#176B52] group-hover:text-[#0D4938]"
                    >
                      <span>자세히 보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
