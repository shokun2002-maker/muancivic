"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/navigation";
import { Search, Menu, X, ChevronDown, Heart } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (id: string) => {
    setExpandedMobileMenu(expandedMobileMenu === id ? null : id);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F7F3]/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 py-3"
            : "bg-[#F7F7F3] border-b border-gray-200 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Logo + Title Text */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#176B52] rounded-lg p-1">
              <div className="relative h-10 w-auto min-w-[36px] flex items-center">
                <Image
                  src="/logo.png"
                  alt="무안 자치주권시민연대 로고"
                  width={140}
                  height={42}
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl text-[#222222] tracking-tight group-hover:text-[#176B52] transition-colors">
                  무안 자치주권시민연대
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#666666] font-medium tracking-wider uppercase -mt-0.5">
                  Muan Civic Sovereignty Alliance
                </span>
              </div>
            </Link>

            {/* CENTER: Desktop 1st & 2nd Level Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="메인 메뉴">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-4 py-2 text-[15px] font-semibold text-[#222222] hover:text-[#176B52] rounded-md transition-colors hover:bg-[#176B52]/5"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-gray-500 ${
                        activeDropdown === item.id ? "rotate-180 text-[#176B52]" : ""
                      }`}
                    />
                  </Link>

                  {/* 2nd Level Dropdown Menu */}
                  {activeDropdown === item.id && (
                    <div className="absolute top-full left-0 w-64 pt-2 dropdown-animate">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden ring-1 ring-black/5">
                        <div className="px-3 py-2 border-b border-gray-100 bg-[#F7F7F3]/60">
                          <p className="text-xs font-bold text-[#176B52] uppercase tracking-wider">
                            {item.name}
                          </p>
                        </div>
                        <div className="py-1">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="group block px-3.5 py-2.5 rounded-lg hover:bg-[#176B52]/10 transition-colors"
                            >
                              <div className="text-[14px] font-medium text-[#222222] group-hover:text-[#176B52]">
                                {sub.name}
                              </div>
                              {sub.description && (
                                <div className="text-[11px] text-[#666666] mt-0.5 group-hover:text-[#176B52]/80 line-clamp-1">
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* RIGHT: Search + CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 text-gray-600 hover:text-[#176B52] hover:bg-[#176B52]/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                aria-label="검색창 열기"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#176B52] hover:bg-[#0D4938] text-white text-[14px] font-semibold rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>함께하기</span>
              </Link>
            </div>

            {/* MOBILE: Search + Hamburger Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-gray-600 hover:text-[#176B52] rounded-lg"
                aria-label="검색하기"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#176B52] hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#F7F7F3] border-b border-gray-200 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto z-40 animate-fadeIn">
            <div className="px-4 pt-3 pb-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <div key={item.id} className="border-b border-gray-200/60 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleMobileSubmenu(item.id)}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-left font-bold text-base text-[#222222]"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedMobileMenu === item.id ? "rotate-180 text-[#176B52]" : ""
                      }`}
                    />
                  </button>

                  {expandedMobileMenu === item.id && (
                    <div className="pl-4 pr-2 py-1 space-y-1.5 bg-white/60 rounded-lg mt-1 border border-gray-100">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm text-[#444444] hover:text-[#176B52] font-medium border-b border-gray-50 last:border-none"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#176B52] text-white font-bold rounded-lg shadow"
                >
                  함께하기 (회원가입 / 후원 / 제보)
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
