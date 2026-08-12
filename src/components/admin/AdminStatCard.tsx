"use client";

import React from "react";

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

export default function AdminStatCard({
  title,
  value,
  icon,
  description,
  badge,
  badgeColor = "bg-emerald-50 text-[#176B52]",
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="p-3 bg-[#F7F7F3] rounded-2xl text-[#176B52]">
            {icon}
          </div>
          {badge && (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>

        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
          {title}
        </h4>

        <div className="text-2xl sm:text-3xl font-extrabold text-[#222222]">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
      </div>

      {description && (
        <p className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100 font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
