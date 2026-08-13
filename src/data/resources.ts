export type ResourceCategory =
  | "정책자료"
  | "토론·포럼"
  | "정책질의"
  | "조사·분석"
  | "공공자료"
  | "기타자료";

export interface PolicyResource {
  id: string;
  slug: string;
  category: ResourceCategory;
  title: string;
  description: string;
  date: string;
  source: string; // 작성기관/출처
  fileFormat: string; // e.g. "PDF"
  fileSize: string; // e.g. "3.2 MB"
  hasFile: boolean;
  fileUrl?: string;
  contentBody?: string[];
}

export const RESOURCE_CATEGORIES: string[] = [
  "전체",
  "정책자료",
  "토론·포럼",
  "정책질의",
  "조사·분석",
  "공공자료",
  "기타자료",
];

export const RESOURCES_DATA: PolicyResource[] = [
  {
    id: "res-1",
    slug: "muan-key-issues",
    category: "정책자료",
    title: "무안군 주요 현안과 지역발전 과제",
    description: "무안 군정 주요 의제에 대한 문제의식과 풀뿌리 시민주권 기반 지역 발전 10대 핵심 과제 분석 보고서입니다.",
    date: "2026.07.25",
    source: "무안 자치주권시민연대 정책위원회",
    fileFormat: "PDF",
    fileSize: "2.8 MB",
    hasFile: true,
    contentBody: [
      "본 자료집은 무안의 현재 정치·행정·환경적 위치를 진단하고 시민 중심의 대안 정책을 제시하기 위해 작성된 종합 보고서입니다.",
      "주요 섹션: 1) 무안군 행정 및 예산 투명성 평가 2) 환경 및 생활권 보존 3) 신도시와 농어촌 균형발전 모델 4) 주민 참여형 자치구조 제안.",
    ],
  },
  {
    id: "res-2",
    slug: "gwangju-airport-future",
    category: "토론·포럼",
    title: "광주 군공항 이전과 무안의 미래",
    description: "전남서부권 민생포럼 발제 자료집으로 군공항 이전이 소음, 환경, 지역경제에 미칠 영향을 다각도로 검토한 자료입니다.",
    date: "2026.05.14",
    source: "무안 자치주권시민연대 & 전남서부권 민생포럼",
    fileFormat: "PDF",
    fileSize: "4.5 MB",
    hasFile: true,
    contentBody: [
      "2026년 5월 14일 전남서부권 민생포럼에서 발표된 「군 공항 이전과 무안의 미래」 공식 발제문입니다.",
      "광주 군공항 무안 이전 논란의 핵심 이슈, 소음 피해 예상 구역 실측 자격 검증, 무안국제공항 미래 비전에 관한 통계 자료가 수록되어 있습니다.",
    ],
  },
  {
    id: "res-3",
    slug: "medical-waste-rights",
    category: "조사·분석",
    title: "의료폐기물 처리시설과 주민 환경권",
    description: "유해물질 소각 시 발생하는 환경 및 주민 보건 영향, 입지 검증 절차에 관한 환경 조사 보고서입니다.",
    date: "2026.06.18",
    source: "시민연대 환경위원회",
    fileFormat: "PDF",
    fileSize: "1.9 MB",
    hasFile: true,
    contentBody: [
      "의료폐기물 소각 시설 사업 환경영향평가서의 문제점 및 유해 배출물질 기준에 대한 환경 전문가 검증 자료입니다.",
      "주민 보건권 보호를 위한 지방자치단체의 환경 규제 가이드라인 제안을 포함하고 있습니다.",
    ],
  },
  {
    id: "res-4",
    slug: "forum-airport-presentation",
    category: "토론·포럼",
    title: "「군공항 이전과 무안의 미래」 토론자료",
    description: "시민사회 및 정책 전문가, 지역 주민들이 참여한 종합 토론회 발표집 및 질의응답 요약서입니다.",
    date: "2026.05.20",
    source: "무안 자치주권시민연대 준비운영위",
    fileFormat: "PDF",
    fileSize: "3.1 MB",
    hasFile: true,
    contentBody: [
      "군공항 이전 공론장 형성을 위한 시민 토론회 패널 발표문 및 주민 질의응답 녹취록 요약본입니다.",
    ],
  },
  {
    id: "res-5",
    slug: "policy-inquiry-questions",
    category: "정책질의",
    title: "지역 현안 관련 정책질의서 및 답변 모음",
    description: "무안군수 및 지방선거 후보자, 관계기관에 전달된 핵심 현안 정책질의서와 서면 답변 결과집입니다.",
    date: "2026.05.31",
    source: "무안 자치주권시민연대 & 무안타임즈",
    fileFormat: "PDF",
    fileSize: "1.4 MB",
    hasFile: true,
    contentBody: [
      "무안군수 후보자 대상 군정 모니터링 및 현안(군공항, 환경, 청년) 공식 서면 정책 질의 및 답변 원문 모음입니다.",
    ],
  },
  {
    id: "res-6",
    slug: "balanced-development-data",
    category: "공공자료",
    title: "무안군 생활권 균형발전을 위한 기초자료",
    description: "남악·오룡 신도시와 무안읍·9개 읍면 농어촌 지역 간의 인구, 교통, 복지 인프라 격차 통계 분석집입니다.",
    date: "2026.06.05",
    source: "시민연대 기획위원회",
    fileFormat: "PDF",
    fileSize: "5.2 MB",
    hasFile: true,
    contentBody: [
      "무안 관내 읍·면별 인구 추이, 대중교통 배차 간격, 사회복지 시설 현황 비교 분석 데이터북입니다.",
    ],
  },
  {
    id: "res-7",
    slug: "citizen-participation-plan",
    category: "정책자료",
    title: "시민참여와 주민자치 활성화 방안",
    description: "읍면 주민자치회 실질 권한 강화 및 주민 참여 예산제도 개혁을 위한 시민연대의 정책 가이드북입니다.",
    date: "2026.07.02",
    source: "무안 자치주권시민연대",
    fileFormat: "PDF",
    fileSize: "2.1 MB",
    hasFile: true,
    contentBody: [
      "풀뿌리 민주주의의 핵심인 주민자치회 운영 실태 분석과 민주적 의사결정 모델 제안서입니다.",
    ],
  },
  {
    id: "res-8",
    slug: "youth-stay-policy",
    category: "기타자료",
    title: "청년이 머무는 무안을 위한 정책과제",
    description: "지역 청년 대상 설문조사 결과를 바탕으로 수립한 청년 주거, 일자리, 문화 공간 종합 지원책입니다.",
    date: "2026.07.12",
    source: "시민연대 청년위원회",
    fileFormat: "PDF",
    fileSize: "1.8 MB",
    hasFile: true,
    contentBody: [
      "무안 청년 300인 심층 설문조사 분석 보고서 및 무안군 청년 정책 조례 개선 제안서입니다.",
    ],
  },
];
