export type EventStatus = "모집예정" | "참여가능" | "상시모집" | "마감";

export interface ParticipationEvent {
  id: string;
  slug: string;
  title: string;
  category: "시민토론회" | "캠페인" | "자원봉사" | "재능기부" | "행사참여";
  status: EventStatus;
  dateStr: string;
  location: string;
  summary: string;
  content: string[];
}

export const PARTICIPATION_EVENTS: ParticipationEvent[] = [
  {
    id: "evt-1",
    slug: "forum-event",
    title: "무안 지역현안 시민토론회",
    category: "시민토론회",
    status: "모집예정",
    dateStr: "2026년 8월 하순 예정 (일시 추후 확정)",
    location: "무안 승달문화예술회관 소강당",
    summary:
      "군공항, 환경, 청년 정주여건 등 무안의 3대 핵심 현안에 대해 시민들이 직접 의견을 내고 대안을 모색하는 열린 토론회입니다.",
    content: [
      "무안 자치주권시민연대는 무안의 주인인 군민들과 함께 지역 의제를 깊이 있게 다루는 정기 토론회를 준비하고 있습니다.",
      "참석 대상: 무안 군민 및 관심 있는 시민 누구나",
      "주요 프로그램: 1) 현안 브리핑 2) 소그룹 패널 토론 3) 전체 질의응답 및 정책 건의안 채택",
    ],
  },
  {
    id: "evt-2",
    slug: "campaign-event",
    title: "생활환경 보호 시민캠페인",
    category: "캠페인",
    status: "참여가능",
    dateStr: "2026.08.20 ~ 2026.09.10 (매주 토요일)",
    location: "무안 남악·오룡 수변공원 및 읍·면 시가지",
    summary:
      "깨끗하고 건강한 무안의 자연 환경과 갯벌을 지키기 위한 시민 플로깅 및 서명 참여 캠페인입니다.",
    content: [
      "자연과 사람이 공존하는 성숙한 무안을 만들기 위해 주말 시민 환경 정화 캠페인을 전개합니다.",
      "준비물: 봉사 활동 복장 (쓰레기봉투 및 장갑 현장 제공)",
      "참여 혜택: 자원봉사 활동 시간 공식 인증 (1365 연계 준비 중)",
    ],
  },
  {
    id: "evt-3",
    slug: "photo-volunteer",
    title: "사진·영상 기록 재능기부 자원활동가 모집",
    category: "재능기부",
    status: "상시모집",
    dateStr: "상시 모집",
    location: "무안 자치주권시민연대 사무처 및 관내 행사 현장",
    summary:
      "시민연대의 토론회, 캠페인, 현장 모니터링 활동을 아름답고 생생하게 사진과 영상으로 기록해 주실 크리에이터를 모십니다.",
    content: [
      "카메라 촬영, 영상 편집, 카드뉴스 제작 등에 재능이 있으신 시민들의 적극적인 참여를 환영합니다.",
      "활동 내용: 시민연대 주요 현장 취재 및 미디어 콘텐츠 제작 지원",
    ],
  },
  {
    id: "evt-4",
    slug: "research-volunteer",
    title: "정책자료 조사 자원활동",
    category: "자원봉사",
    status: "상시모집",
    dateStr: "상시 모집",
    location: "온라인/오프라인 연계",
    summary:
      "무안군정 및 의정 정보 공개 모니터링, 타 지자체 조례 비교 조사 등을 함께 수행할 시민 모니터단을 모집합니다.",
    content: [
      "주민 알 권리 수호 및 행정 정보 모니터링에 관심 있으신 분들의 참여를 기다립니다.",
      "사전 모니터링 오리엔테이션 제공 및 모니터단 자격 부여",
    ],
  },
];
