export interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  subItems: SubMenuItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "about",
    name: "시민연대 소개",
    href: "/about/greeting",
    subItems: [
      { name: "홈페이지 방문 환영 인사", href: "/about/greeting", description: "시민 여러분께 드리는 인사말" },
      { name: "창립선언문", href: "/about/declaration", description: "시민 주권의 출발점" },
      { name: "정관", href: "/about/rules", description: "시민연대 조직 운영 규약" },
      { name: "시민연대가 걸어온 길", href: "/about/history", description: "발자취 및 주요 연혁" },
      { name: "조직도", href: "/about/organization", description: "임원 및 부서 구성" },
    ],
  },
  {
    id: "issues",
    name: "무안 이슈",
    href: "/issues/current",
    subItems: [
      { name: "주요 현안", href: "/issues/current", description: "우리가 살피는 핵심 의제" },
      { name: "정책·행정 모니터링", href: "/issues/monitoring", description: "군정 및 예산 감시 리포트" },
      { name: "시민의 목소리", href: "/issues/voices", description: "주민들의 다양한 의견과 제안" },
      { name: "정책자료실", href: "/issues/resources", description: "지역 발전 연구 및 정보 자료" },
    ],
  },
  {
    id: "news",
    name: "시민연대 소식",
    href: "/#news",
    subItems: [
      { name: "활동소식", href: "/#news", description: "생생한 현장 활동 기록" },
      { name: "공지사항", href: "/#notices", description: "알림 및 회원 모임" },
      { name: "성명·논평", href: "/#statements", description: "공식 입장 발표" },
      { name: "사진·영상", href: "/#gallery", description: "미디어 갤러리" },
    ],
  },
  {
    id: "join",
    name: "함께하기",
    href: "/#join",
    subItems: [
      { name: "회원가입", href: "/#join", description: "시민연대의 회원이 되는 길" },
      { name: "시민참여", href: "/#join", description: "토론·캠페인·활동 참여" },
      { name: "후원하기", href: "/#join", description: "독립적 시민활동 후원" },
      { name: "문의·제보", href: "/#join", description: "소중한 의견과 제보" },
    ],
  },
];
