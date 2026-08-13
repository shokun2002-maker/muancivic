"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdminPath && <Footer />}
    </>
  );
}
