import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://muancivic.or.kr"),
  title: "무안 자치주권시민연대 공식 홈페이지",
  description:
    "무안의 지역 현안을 알리고 시민 의견을 모으며, 정책과 행정을 모니터링하고 시민의 참여를 연결하는 온라인 시민광장",
  keywords: [
    "무안 자치주권시민연대",
    "무안시민연대",
    "무안 현안",
    "군공항 이전 반대",
    "무안 군정 모니터링",
    "시민참여",
  ],
  authors: [{ name: "무안 자치주권시민연대" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased bg-[#F7F7F3] text-[#222222]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
