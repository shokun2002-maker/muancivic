export interface MonitoringPost {
  id: string;
  slug: string;
  category: "무안군정" | "무안군의회" | "예산" | "정책점검";
  title: string;
  summary: string;
  date: string;
  author: string;
  targetExamined: string; // 무엇을 살펴봤나요?
  currentProgress: string; // 현재 어떻게 진행되고 있나요?
  keyIssuePoint: string; // 무엇이 쟁점인가요?
  alliancePerspective: string; // 시민연대는 이렇게 봅니다
  proposalText: string; // 시민연대의 제안
  statusTimeline: { dateStr: string; text: string }[];
  isSampleDisclaimer: boolean;
}

export const MONITORING_CATEGORIES = [
  "전체",
  "무안군정",
  "무안군의회",
  "예산",
  "정책점검",
];

export const MONITORING_DATA: MonitoringPost[] = [
  {
    id: "mon-1",
    slug: "2026-policy",
    category: "무안군정",
    title: "2026 무안군 주요 정책 살펴보기",
    summary: "2026년 무안군 핵심 역점 사업의 투명성과 주민 체감도를 분석하고 대안을 제안합니다.",
    date: "2026.08.01",
    author: "정책위원회 모니터단",
    targetExamined: "2026년도 무안군 행정 종합 계획 및 분야별(농업, 복지, 건설) 주요 추진 의제",
    currentProgress: "상반기 주요 사업 집행율 평가 및 하반기 공약 이행률 조사를 실시하고 있습니다.",
    keyIssuePoint: "주민 알 권리 사전 보장 여부 및 예산 집행 우선순위 타당성 검증",
    alliancePerspective: "행정의 효율성 못지않게 군민과의 충분한 소통과 의견 수렴 과정이 공정성의 핵심입니다.",
    proposalText: "사업 입안 단계부터 무안 군민이 참여하는 '주민 참여 정책 사전 검증제' 도입을 제안합니다.",
    statusTimeline: [
      { dateStr: "2026.05", text: "2026 무안군 주요 정책 자료 수집 및 기초 조사" },
      { dateStr: "2026.06", text: "정책 전문가 자문 회의 개최" },
      { dateStr: "2026.07", text: "1차 모니터링보고서 작성" },
      { dateStr: "2026.08", text: "최종 제안서 무안군 전달 및 공개" },
    ],
    isSampleDisclaimer: true,
  },
  {
    id: "mon-2",
    slug: "council-monitoring",
    category: "무안군의회",
    title: "무안군의회 의정활동 모니터링",
    summary: "군의원들의 조례 발의, 행정사무감사 질의, 회의 참석률 등을 다각도로 모니터링합니다.",
    date: "2026.07.28",
    author: "의정감시특별위원회",
    targetExamined: "제9대 무안군의회 상임위원회 및 본회의 회의록, 조례안 발의 건수",
    currentProgress: "상반기 행정사무감사 주요 질의 내용 분석 및 피드백 작업을 마무리했습니다.",
    keyIssuePoint: " 형식적 질의 탈피 및 실질적 군정 감시·대안 제시 능력 강화",
    alliancePerspective: "군의회는 군민의 대표 기구로서 집행부를 매섭게 감시하고 대안을 제시해야 할 의무가 있습니다.",
    proposalText: "군의회 회의 실시간 온라인 생중계 확대 및 의정활동 보고서의 군민 공개 의무화를 제안합니다.",
    statusTimeline: [
      { dateStr: "2026.05", text: "의정 모니터링단 구성 및 모니터링 지표 확정" },
      { dateStr: "2026.06", text: "행정사무감사 현장 방청 및 회의록 분석" },
      { dateStr: "2026.07", text: "의정활동 평가지표 집계 및 1차 총평" },
    ],
    isSampleDisclaimer: true,
  },
  {
    id: "mon-3",
    slug: "budget-analysis",
    category: "예산",
    title: "무안군 예산, 어디에 어떻게 쓰이고 있나",
    summary: "무안군 1년 예산 편성 현황과 불요불급한 낭비성 예산 유무를 꼼꼼히 점검합니다.",
    date: "2026.07.10",
    author: "예산감시팀",
    targetExamined: "무안군 세입·세출 본예산 및 추경 예산서, 선심성 행사 예산 비율",
    currentProgress: "분기별 집행 내역 분석 및 주요 불용액 발생 원인을 조사하고 있습니다.",
    keyIssuePoint: "농어민 지원 및 복지 예산 대 불필요한 보도블록·토목 사업 비율 비교",
    alliancePerspective: "군민의 혈세로 조성된 예산은 소외된 주민과 지속가능한 미래에 우선 배정되어야 합니다.",
    proposalText: "주민참여예산제 실질 반영 비율 20% 이상 확대 및 예산 편성 사전 군민 공청회 정례화를 요구합니다.",
    statusTimeline: [
      { dateStr: "2026.04", text: "무안군 결산서 및 예산서 데이터 입수" },
      { dateStr: "2026.05", text: "분야별 예산 비율 비교 통계 분석" },
      { dateStr: "2026.07", text: "예산 감시 종합 리포트 발표" },
    ],
    isSampleDisclaimer: true,
  },
  {
    id: "mon-4",
    slug: "development-check",
    category: "정책점검",
    title: "주요 개발사업, 시민에게 충분히 공개되고 있나",
    summary: "신도시 및 농촌 개발 사업의 정보 공개 실태와 행정 절차 준수 여부를 모니터링합니다.",
    date: "2026.06.20",
    author: "환경개발위원회",
    targetExamined: "무안군 관내 대규모 수용·개발 사업의 사업계획서 정보공개 청구 응답률",
    currentProgress: "정보공개 청구 처리 기한 준수 여부 및 비공개 처분 건에 대한 이의신청 진행 중입니다.",
    keyIssuePoint: "공공 개발사업 관련 정보의 깜깜이 추진 및 주민 설명회 부실 개최",
    alliancePerspective: "개발의 이익은 군민에게 돌아가야 하며, 정보는 처음부터 철저히 투명하게 공개되어야 합니다.",
    proposalText: "모든 지자체 개발사업 정보공개 통합 포털 구축 및 사업 전 사전 주민 설명회 의무화를 제안합니다.",
    statusTimeline: [
      { dateStr: "2026.04", text: "개발사업 관련 정보공개 청구 15건 접수" },
      { dateStr: "2026.05", text: "행정 기관 정보공개 응답 분석" },
      { dateStr: "2026.06", text: "정보공개 가이드라인 개선안 권고" },
    ],
    isSampleDisclaimer: true,
  },
];
