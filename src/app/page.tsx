import HeroSection from "@/components/HeroSection";
import IssueCardsSection from "@/components/IssueCardsSection";
import ActivityNewsSection from "@/components/ActivityNewsSection";
import CitizenVoiceSection from "@/components/CitizenVoiceSection";
import MonitoringSection from "@/components/MonitoringSection";
import TimelineSection from "@/components/TimelineSection";
import DeclarationSection from "@/components/DeclarationSection";
import JoinUsSection from "@/components/JoinUsSection";
import GallerySection from "@/components/GallerySection";
import FinalMessageSection from "@/components/FinalMessageSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 01: HERO */}
      <HeroSection />

      {/* SECTION 02: 지금 무안에서는 (주요 현안 4개 카드) */}
      <IssueCardsSection />

      {/* SECTION 03: 시민이 움직이면 무안이 달라집니다 (활동소식) */}
      <ActivityNewsSection />

      {/* SECTION 04: 시민의 목소리 (시민제안 카드) */}
      <CitizenVoiceSection />

      {/* SECTION 05: 시민연대가 바라보는 무안 (모니터링) */}
      <MonitoringSection />

      {/* SECTION 06: 우리의 시작 (타임라인) */}
      <TimelineSection />

      {/* SECTION 07: 창립선언 강조 영역 */}
      <DeclarationSection />

      {/* SECTION 08: 함께하기 (4개 카드) */}
      <JoinUsSection />

      {/* SECTION 09: 시민연대 현장 (갤러리) */}
      <GallerySection />

      {/* SECTION 10: 마지막 메시지 영역 */}
      <FinalMessageSection />
    </div>
  );
}
