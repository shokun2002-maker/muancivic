"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  title,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="absolute top-4 inset-x-4 flex items-center justify-between z-20 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs sm:text-sm font-bold bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
          {title && <span className="mr-2 text-amber-300">{title}</span>}
          <span>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/30 rounded-full transition-colors focus:outline-none"
          aria-label="닫기 (ESC)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
          <Image
            src={currentImage}
            alt={title || "미디어 갤러리 이미지"}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors z-20 focus:outline-none"
          aria-label="이전 사진"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors z-20 focus:outline-none"
          aria-label="다음 사진"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
