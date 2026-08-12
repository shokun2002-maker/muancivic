export interface IssueCardItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
  statusBadgeColor: string;
  imageUrl?: string;
}

export interface ActivityNewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  isFeatured?: boolean;
}

export interface CitizenVoiceItem {
  id: string;
  title: string;
  category: string;
  likesCount: number;
  author: string;
  date: string;
}

export interface TimelineItem {
  yearMonth: string;
  title: string;
  description?: string;
  isHighlight?: boolean;
}

export interface JoinUsCardItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  actionText: string;
  href: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  type: "photo" | "video";
  category: string;
}

// SECTION 02: 지금 무안에서는 (주요 현안 카드 4종)
export const MOCK_ISSUES: IssueCardItem[] = [
  {
    id: "military-airport",
    category: "군정 · 안보",
    title: "광주 군공항 무안 이전",
    description: "무안군민의 생존권과 지역 자치권을 일방적으로 침해하는 군공항 무안 이전을 반대하고 주민 뜻에 기반한 주권 수호를 지속합니다.",
    status: "대응 진행중",
    statusBadgeColor: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: "waste-incinerator",
    category: "환경 · 주민보건",
    title: "의료폐기물 소각장",
    description: "청정 무안의 생태 환경과 농축산 피해를 위협하는 불법 및 편법 의료폐기물 소각장 설립 입지를 투명하게 감시합니다.",
    status: "현장 감시중",
    statusBadgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    id: "power-lines",
    category: "안전 · 주거환경",
    title: "고압 송전선로",
    description: "농경지와 마을을 관통하는 고압 송전선로에 대해 지중화 추진 및 주민 피해 우회 노선 마련 대안 조치를 요구합니다.",
    status: "대안 제시중",
    statusBadgeColor: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "environment-development",
    category: "지속가능 · 갯벌보존",
    title: "환경과 지역개발",
    description: "람사르 습지 무안 갯벌 생태계를 보존하며 난개발을 막고, 주민 주도 지속 가능한 지역 개발 모델을 검토합니다.",
    status: "상시 모니터링",
    statusBadgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
];

// SECTION 03: 시민이 움직이면 무안이 달라집니다 (시민연대 활동소식)
export const FEATURED_ACTIVITY: ActivityNewsItem = {
  id: "featured-inauguration",
  title: "무안 자치주권시민연대 공식 출범",
  date: "2026.07.24",
  category: "출범 행사",
  summary: "시민이 주인이 되는 무안군을 만들기 위해 무안 9개 읍·면 군민들과 지역 인사들이 결의를 다지며 공식 출범식을 가졌습니다.",
  isFeatured: true,
};

export const ADDITIONAL_ACTIVITIES: ActivityNewsItem[] = [
  {
    id: "act-01",
    title: "무안 자치주권시민연대 발기인대회 개최",
    date: "2026.05.06",
    category: "발기인 모임",
    summary: "지역 사회 각계각층의 뜻있는 시민들이 모여 시민연대의 방향성과 행동 강령을 발표했습니다.",
  },
  {
    id: "act-02",
    title: "군공항 이전과 무안의 미래 주제 토론 발제",
    date: "2026.06.18",
    category: "정책 토론",
    summary: "전문가와 지역 주민이 한자리에 모여 일방적 군공항 이전 대책 및 자치권 수호 방안을 논의했습니다.",
  },
  {
    id: "act-03",
    title: "목포 및 전남 서남권 시민단체 간담회 진행",
    date: "2026.07.10",
    category: "연대 협력",
    summary: "인근 서남권 시민사회단체들과 함께 공동 현안 대응 및 연대 강화를 위한 워크숍을 개최했습니다.",
  },
];

// SECTION 04: 시민의 목소리 (시민제안 샘플 카드)
export const MOCK_CITIZEN_VOICES: CitizenVoiceItem[] = [
  {
    id: "voice-1",
    title: "남악·오룡과 무안읍을 연결하는 대중교통 노선 확충이 필요합니다.",
    category: "교통",
    likesCount: 128,
    author: "삼향읍 주민",
    date: "2026.08.01",
  },
  {
    id: "voice-2",
    title: "청년들이 무안을 떠나지 않아도 되는 양질의 일자리를 만들어주세요.",
    category: "청년",
    likesCount: 96,
    author: "청계면 청년",
    date: "2026.07.28",
  },
  {
    id: "voice-3",
    title: "읍·면 단위 주민참여예산 사업 심의 과정에 군민 참관을 보장해주세요.",
    category: "행정",
    likesCount: 84,
    author: "무안읍 군민",
    date: "2026.07.22",
  },
];

// SECTION 05: 시민연대가 바라보는 무안 (모니터링 영역)
export const MONITORING_CARDS = [
  {
    id: "mon-1",
    title: "2026 무안군 주요 정책 살펴보기",
    description: "무안군 주요 핵심사업의 타당성과 주민 수혜도, 환경 영향을 다각도로 검토하고 평가합니다.",
    tag: "정책 분석",
  },
  {
    id: "mon-2",
    title: "무안군의회 의정활동 모니터링",
    description: "군기본 조례 제·개정, 조례 발의 건수 및 상임위원회 출석률, 구체적 의정 질의 내용을 정기 점검합니다.",
    tag: "의정 감시",
  },
  {
    id: "mon-3",
    title: "무안군 예산, 어디에 어떻게 쓰이고 있나",
    description: "연간 8천억 원 규모의 무안군 예산 집행 내역과 선심성·낭비성 사업 예산 편성 여부를 투명하게 공개합니다.",
    tag: "예산 검증",
  },
];

// SECTION 06: 우리의 시작 (타임라인)
export const TIMELINE_DATA: TimelineItem[] = [
  {
    yearMonth: "2025.04",
    title: "시민단체 창립 결의",
    description: "무안 군정 모니터링 및 자치권 확립을 위한 민간 준비모임 결성",
  },
  {
    yearMonth: "2025.12",
    title: "강령 및 규약 초안 작성",
    description: "독립성, 공공성, 비영리 원칙을 명시한 시민연대 정관과 강령 체계 완성",
  },
  {
    yearMonth: "2026.01",
    title: "발기인 모임 본격화",
    description: "무안 9개 읍·면 대표 발기인 100여 명 모임 구성 및 조직화",
  },
  {
    yearMonth: "2026.05.06",
    title: "발기인대회 개최",
    description: "무안 승달문화예술회관에서 군민 200여 명과 취지문 발표",
  },
  {
    yearMonth: "2026.07.24",
    title: "무안 자치주권시민연대 공식 출범",
    description: "공식 창립총회 개최 및 풀뿌리 시민주권 선언문 발표",
    isHighlight: true,
  },
];

// SECTION 08: 함께하기 (4개 카드)
export const JOIN_US_CARDS: JoinUsCardItem[] = [
  {
    id: "join-member",
    title: "회원가입",
    description: "시민연대의 회원이 되어주세요.",
    iconName: "UserPlus",
    actionText: "회원가입 신청",
    href: "#join-member",
  },
  {
    id: "join-participate",
    title: "시민참여",
    description: "토론·캠페인·활동에 참여해주세요.",
    iconName: "Users",
    actionText: "활동 참여하기",
    href: "#join-participate",
  },
  {
    id: "join-support",
    title: "후원하기",
    description: "시민의 힘으로 시민연대를 응원해주세요.",
    iconName: "Heart",
    actionText: "후원하기",
    href: "#join-support",
  },
  {
    id: "join-inquiry",
    title: "문의·제보",
    description: "무안의 이야기를 들려주세요.",
    iconName: "MessageSquare",
    actionText: "문의 및 제보",
    href: "#join-inquiry",
  },
];

// SECTION 09: 시민연대 현장 (갤러리 6-grid)
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "gal-1", title: "무안 자치주권시민연대 창립총회 및 출범식 현장", date: "2026.07.24", type: "photo", category: "행사" },
  { id: "gal-2", title: "군공항 이전 반대 시민 거리 피켓 캠페인", date: "2026.07.15", type: "photo", category: "캠페인" },
  { id: "gal-3", title: "지역 기자단과 함께하는 군정 현안 긴급 기자회견", date: "2026.07.02", type: "video", category: "기자회견" },
  { id: "gal-4", title: "무안 갯벌 생태 환경정화 봉사활동 기록 영상", date: "2026.06.25", type: "video", category: "봉사활동" },
  { id: "gal-5", title: "주민 자치 실질화를 위한 읍·면 간담회", date: "2026.06.10", type: "photo", category: "간담회" },
  { id: "gal-6", title: "시민연대 발기인대회 단체 기념 촬영", date: "2026.05.06", type: "photo", category: "행사" },
];
