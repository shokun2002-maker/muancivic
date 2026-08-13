import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "무안 자치주권시민연대",
    template: "%s | 무안 자치주권시민연대",
  },
  description:
    "시민이 참여하고 시민이 결정하는 무안, 지역 자치주권 수호와 민주적 공동체 발전",
  openGraph: {
    title: "무안 자치주권시민연대",
    description:
      "시민이 참여하고 시민이 결정하는 무안, 지역 자치주권 수호와 민주적 공동체 발전",
    siteName: "무안 자치주권시민연대",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/inaugural_assembly.jpg",
        width: 1200,
        height: 630,
        alt: "무안 자치주권시민연대",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased bg-[#F7F7F3] text-[#222222]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
