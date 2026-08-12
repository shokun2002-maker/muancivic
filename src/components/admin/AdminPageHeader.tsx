"use client";

import React from "react";

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, action }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1.5">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
