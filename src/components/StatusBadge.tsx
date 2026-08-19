import React from "react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStyle = () => {
    switch (status) {
      case "논의 중":
      case "검토 중":
      case "모니터링":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "대응 중":
      case "공론화":
        return "bg-red-50 text-red-700 border-red-200";
      case "접수":
      case "처리 중":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "정책제안":
      case "해결":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "답변완료":
      case "답변 완료":
      case "종료":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "관심 현안":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-extrabold px-2.5 py-1 rounded-full border ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </span>
  );
}
