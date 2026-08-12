export interface NoticePost {
  id: string;
  noticeNum: number;
  slug: string;
  category: string;
  title: string;
  date: string;
  views: number;
  content: string[];
  attachments?: { title: string; size: string }[];
}

export const NOTICES_DATA: NoticePost[] = [
  {
    id: "not-1",
    noticeNum: 4,
    slug: "member-recruitment",
    category: "회원모집",
    title: "무안 자치주권시민연대 회원 모집 안내",
    date: "2026.07.25",
    views: 342,
    content: [
      "무안의 주인인 군민 여러분과 함께 정의롭고 공정한 지역사회를 만들어 갈 회원분들을 모십니다.",
      "무안 자치주권시민연대는 정회원, 준회원, 후원회원으로 구성되며 무안의 풀뿌리 민주주의와 지역 주권 수호에 뜻을 같이하는 군민 누구나 가입하실 수 있습니다.",
      "가입 방법: 홈페이지 [함께하기 > 회원가입] 메뉴를 통해 온라인으로 신청해 주시기 바랍니다.",
    ],
    attachments: [
      { title: "무안 자치주권시민연대 회원 가입 신청서 및 개인정보 동의서.pdf", size: "1.2 MB" },
    ],
  },
  {
    id: "not-2",
    noticeNum: 3,
    slug: "forum-notice",
    category: "행사안내",
    title: "시민과 함께하는 지역현안 토론회 안내",
    date: "2026.07.18",
    views: 218,
    content: [
      "무안 관내 주요 현안(군공항, 환경, 청년)에 관한 시민들의 목소리를 모으는 정기 시민 토론회를 개최합니다.",
      "일시: 2026년 8월 중 예정 (상세 장소 및 일시 추후 공지)",
      "대상: 무안 군민 및 관련 분야에 관심 있는 시민 누구나",
    ],
    attachments: [
      { title: "지역현안 시민 토론회 안내 포스터.pdf", size: "850 KB" },
    ],
  },
  {
    id: "not-3",
    noticeNum: 2,
    slug: "steering-meeting",
    category: "알림",
    title: "운영위원회 개최 안내",
    date: "2026.07.05",
    views: 154,
    content: [
      "2026년도 하반기 사업 계획 및 예산안 심의를 위한 정기 운영위원회가 다음과 같이 개최됩니다.",
      "안건: 1) 하반기 분과위원회 활동 계획 2) 회원 관리 및 소식지 발간 3) 지역 현안 감시 보고서 수립",
    ],
  },
  {
    id: "not-4",
    noticeNum: 1,
    slug: "campaign-notice",
    category: "캠페인",
    title: "시민참여 캠페인 안내",
    date: "2026.06.28",
    views: 189,
    content: [
      "깨끗한 무안 환경과 주민 알 권리를 높이기 위한 시민참여 캠페인을 시행합니다.",
      "군민 여러분의 많은 관심과 참여를 부탁드립니다.",
    ],
  },
];
