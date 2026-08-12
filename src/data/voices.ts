export type VoiceCategory =
  | "교통"
  | "환경"
  | "농어업"
  | "교육"
  | "복지"
  | "청년"
  | "문화·관광"
  | "지역경제"
  | "행정"
  | "기타";

export type VoiceStatus = "접수" | "검토 중" | "공론화" | "정책제안" | "답변완료";

export interface CitizenVoice {
  id: string;
  slug: string;
  category: VoiceCategory;
  title: string;
  content: string;
  likesCount: number;
  status: VoiceStatus;
  date: string;
  author: string;
  allianceReview?: string; // 시민연대 검토상황
  isSample: boolean;
}

export const VOICE_CATEGORIES: string[] = [
  "전체",
  "교통",
  "환경",
  "농어업",
  "교육",
  "복지",
  "청년",
  "문화·관광",
  "지역경제",
  "행정",
  "기타",
];

export const VOICES_DATA: CitizenVoice[] = [
  {
    id: "voice-1",
    slug: "transport-connect",
    category: "교통",
    title: "남악·오룡과 무안읍을 연결하는 대중교통이 더 필요합니다",
    content:
      "남악·오룡 신도시와 무안읍 생활권 간의 대중교통 노선 배차 간격이 너무 길고 이동이 불편합니다. 군민들이 무안 관내를 보다 자유롭게 이동할 수 있도록 순환버스 및 직행버스 증편이 꼭 필요합니다.",
    likesCount: 128,
    status: "검토 중",
    date: "2026.08.02",
    author: "남악 주민 무안사랑",
    allianceReview:
      "시민연대 정책위원회에서 남악-무안읍 노선 간 버스 배차 시간표 실측을 마치고, 무안군 건설교통과에 개선 요청 건의서를 전달하여 답변을 기다리는 중입니다.",
    isSample: true,
  },
  {
    id: "voice-2",
    slug: "youth-jobs",
    category: "청년",
    title: "청년들이 무안을 떠나지 않아도 되는 일자리를 만들어주세요",
    content:
      "무안에서 나고 자란 청년들이 대학 졸업 후 무안에 정착하고 싶어도 괜찮은 일자리가 부족해 수도권이나 타 지역으로 떠나고 있습니다. 청년 창업 지원 및 지자체-기업 연계형 일자리 정책이 확대되었으면 좋겠습니다.",
    likesCount: 96,
    status: "접수",
    date: "2026.07.29",
    author: "청년 군민 곽00",
    allianceReview:
      "접수된 안건으로 청년위원회에서 무안군 청년 정주 여건 조사 및 청년 창업 공간 지원 현황 파악을 진행할 예정입니다.",
    isSample: true,
  },
  {
    id: "voice-3",
    slug: "village-facility",
    category: "환경",
    title: "우리 마을에 들어오는 시설, 주민에게 먼저 알려주세요",
    content:
      "마을 부근에 유해 시설이나 대형 공장이 들어설 때 주민들이 사전에 제대로 안내받지 못하고 공사 착공 단계에서야 알게 되는 경우가 있습니다. 모든 관련 시설 허가 전에 마을 주민 설명회를 의무화해 주세요.",
    likesCount: 74,
    status: "공론화",
    date: "2026.07.21",
    author: "청계면 주민 이00",
    allianceReview:
      "주민 알 권리와 환경권 보장을 위해 시민연대 환경위원회에서 본 의제를 8월 정기 시민 토론회 공식 공론화 주제로 선정하였습니다.",
    isSample: true,
  },
  {
    id: "voice-4",
    slug: "farmer-policy",
    category: "농어업",
    title: "농어민이 체감할 수 있는 정책이 필요합니다",
    content:
      "무안 양파 및 갯벌 김 농가 등 농어민들의 기후변화 피해와 자재비 상승 부담이 극심합니다. 형식적인 보조금 체계를 넘어 농가 소득 보장과 기후위기 대응 지원책을 강력히 마련해 주세요.",
    likesCount: 61,
    status: "검토 중",
    date: "2026.07.15",
    author: "무안 농민 김00",
    allianceReview:
      "지역 농어민단체 간담회를 추진 중이며, 농가 직불금 및 농업재해 보상금 실효성 분석 작업을 실시하고 있습니다.",
    isSample: true,
  },
  {
    id: "voice-5",
    slug: "mudflat-tourism",
    category: "문화·관광",
    title: "무안의 갯벌과 농촌을 관광자원으로 활용했으면 합니다",
    content:
      "세계적으로 가치를 인정받는 무안 람사르 갯벌과 아름다운 농촌 마을을 잇는 친환경 생태관광 루트를 개발해 지역 경제도 살리고 환경도 보존하는 상생 모델을 만들어 주세요.",
    likesCount: 48,
    status: "접수",
    date: "2026.07.08",
    author: "문화예술 동호회 정00",
    allianceReview: "시민문화예술위원회에서 무안 생태관광 의제 제안서를 작성 중입니다.",
    isSample: true,
  },
  {
    id: "voice-6",
    slug: "children-education",
    category: "교육",
    title: "아이들이 무안에서 더 다양한 경험을 했으면 좋겠습니다",
    content:
      "청소년 문화의 집, 어린이 도서관, 주말 체험 프로그램 등 아이들이 무안에서 안전하게 놀고 배울 수 있는 교육 복지 인프라가 읍·면 지역까지 확충되었으면 합니다.",
    likesCount: 57,
    status: "정책제안",
    date: "2026.07.01",
    author: "무안 학부모 박00",
    allianceReview:
      "무안군 교육 지원 예산 분석 결과를 바탕으로, 군의회 교육 복지 위원회에 정식 정책 제안서 형태로 제출을 마쳤습니다.",
    isSample: true,
  },
];
