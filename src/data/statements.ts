export interface StatementPost {
  id: string;
  slug: string;
  category: "성명서" | "논평" | "입장문";
  title: string;
  date: string;
  summary: string;
  content: string[];
  isSampleDisclaimer: boolean;
  attachments?: { title: string; size: string }[];
}

export const STATEMENTS_DATA: StatementPost[] = [
  {
    id: "state-1",
    slug: "airport-statement",
    category: "성명서",
    title: "광주 군공항 이전 문제에 대한 시민연대 입장",
    date: "2026.07.26",
    summary:
      "군공항 이전 문제는 일부 정치권이나 지자체의 일방적 판단이 아닌 무안군민의 알 권리와 주권에 따라 공론장에서 결정되어야 함을 강력히 촉구합니다.",
    isSampleDisclaimer: true,
    content: [
      "[시연용 예시 성명서] 본 콘텐츠는 홈페이지 시연용 예시 성명서이며 실제 공식 성명이 아닙니다.",
      "광주 군공항 이전 문제는 무안군의 미래 100년과 군민의 삶의 질에 중대한 영향을 미치는 국가적·지역적 사안입니다.",
      "정부와 관련 지자체는 소음 영향 평가, 주민 지원책, 지역 경제 영향에 관한 모든 정보를 밀실이 아닌 군민들에게 투명하고 일관되게 공개해야 합니다.",
      "우리는 찬반의 이분법적 논리를 넘어, 오직 무안군민의 안전과 이익을 최우선에 두는 공론화와 숙의 과정을 요구합니다.",
    ],
    attachments: [
      { title: "군공항 이전 현안에 대한 시민연대 공식 입장문 전문.pdf", size: "1.4 MB" },
    ],
  },
  {
    id: "state-2",
    slug: "waste-statement",
    category: "성명서",
    title: "의료폐기물 소각장 관련 시민연대 입장",
    date: "2026.06.30",
    summary:
      "지역 주민의 건강권과 환경권보다 우위에 있는 사업 추진은 있을 수 없습니다. 의료폐기물 소각장의 환경 영향 검증과 정보 공개를 제안합니다.",
    isSampleDisclaimer: true,
    content: [
      "[시연용 예시 성명서] 본 콘텐츠는 홈페이지 시연용 예시 성명서이며 실제 공식 성명이 아닙니다.",
      "주민 생활환경과 보건에 미치는 유해 물질에 대한 환경영향평가가 객관적으로 진행되어야 합니다.",
      "주민 동의 없는 일방적 시설 인허가 추진에 대해 깊은 우려를 표하며, 사업자와 관계기관의 투명한 자료 공개를 촉구합니다.",
    ],
  },
  {
    id: "state-3",
    slug: "info-disclosure-commentary",
    category: "논평",
    title: "주민 알 권리와 행정정보 공개에 대한 논평",
    date: "2026.06.12",
    summary:
      "풀뿌리 지방자치는 투명한 행정정보 공개에서 출발합니다. 무안군의 적극적인 정보 공개 행정을 요구합니다.",
    isSampleDisclaimer: true,
    content: [
      "[시연용 예시 논평] 본 콘텐츠는 홈페이지 시연용 예시 논평이며 실제 공식 논평이 아닙니다.",
      "정보공개 청구에 대한 지자체의 무분별한 비공개 처분 관행은 시민 자치를 위축시킵니다.",
      "무안군정의 모든 주요 사업 정보가 군민 누구나 쉽게 찾아보고 검증할 수 있도록 정보공개 제도가 혁신되어야 합니다.",
    ],
  },
];
