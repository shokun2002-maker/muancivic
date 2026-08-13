"use client";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased bg-[#F7F7F3] text-[#222222]">
        {!isAdminPath && <Header />}
        <main className="flex-1">{children}</main>
        {!isAdminPath && <Footer />}
      </body>
    </html>
  );
}
