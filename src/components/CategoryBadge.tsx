import React from "react";
import { Tag } from "lucide-react";

interface CategoryBadgeProps {
  category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#176B52] bg-[#176B52]/10 px-2.5 py-1 rounded-md">
      <Tag className="w-3 h-3" />
      {category}
    </span>
  );
}
