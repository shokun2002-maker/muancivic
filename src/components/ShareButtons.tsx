"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? url || window.location.href : "";

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        alert(`복사된 링크: ${currentUrl}`);
      }
    } catch {
      alert(`링크: ${currentUrl}`);
    }
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleXShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleKakaoShare = () => {
    alert("카카오톡 공유 기능 안내: 카카오 API 키 연동 후 정식 활성화될 영역입니다. 현재는 링크 복사를 이용해 주세요!");
  };

  const handleNativeShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: currentUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="bg-[#F7F7F3] rounded-2xl p-6 border border-gray-200/80 my-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block mb-1">
            SHARE THIS STORY
          </span>
          <h4 className="text-sm font-bold text-[#222222]">
            이 정보와 소식을 시민들과 함께 공유하기
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Kakao Talk (Placeholder) */}
          <button
            type="button"
            onClick={handleKakaoShare}
            className="px-3.5 py-2 bg-[#FEE500] hover:bg-[#ebd300] text-[#3c1e1e] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            title="카카오톡 공유"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">카카오톡</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookShare}
            className="px-3.5 py-2 bg-[#1877F2] hover:bg-[#1361c8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            title="페이스북 공유"
          >
            <span className="font-mono font-black text-sm">f</span>
            <span className="hidden sm:inline">Facebook</span>
          </button>

          {/* X / Twitter */}
          <button
            type="button"
            onClick={handleXShare}
            className="px-3.5 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            title="X (트위터) 공유"
          >
            <span className="font-extrabold text-xs">𝕏</span>
            <span className="hidden sm:inline">X</span>
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3.5 py-2 bg-white hover:bg-gray-100 text-[#222222] border border-gray-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-500" />
                <span>링크 복사</span>
              </>
            )}
          </button>

          {/* Web Share API (Mobile) */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="px-3.5 py-2 bg-[#176B52] hover:bg-[#0D4938] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>공유하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
