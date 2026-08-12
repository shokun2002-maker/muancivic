export interface MemberPerson {
  roleTitle: string;
  name: string;
}

export interface CommitteeItem {
  name: string;
  headName: string;
  description?: string;
}

export const ORGANIZATION_DATA = {
  pageTitle: "조직도",
  category: "시민연대 소개",
  highlightQuote: "시민의 참여와 연대로 민주적이며 투명하게 운영됩니다.",
  jointRepresentatives: {
    title: "공동대표단",
    standingRep: { roleTitle: "상임대표", name: "김호산" },
    coReps: [
      { roleTitle: "공동대표", name: "배삼태" },
      { roleTitle: "공동대표", name: "송길원" },
      { roleTitle: "공동대표", name: "고두갑" },
      { roleTitle: "공동대표", name: "송용도" },
    ],
  },
  auditors: {
    title: "감사",
    members: [
      { roleTitle: "감사", name: "이승연" },
      { roleTitle: "감사", name: "박혜진" },
    ],
  },
  advisoryGroup: {
    advisors: {
      title: "고문단",
      standingAdvisor: { roleTitle: "상임고문", name: "김상춘" },
      members: ["오해균", "김교선", "강기삼", "한만선", "김양정"],
    },
    consultants: {
      title: "자문위원회",
      members: ["이기옥", "최영일", "박혜진"],
    },
  },
  executiveLine: {
    assembly: "총회 (최상위 의결기구)",
    steeringCommittee: "운영위원회 (주요 집행 심의·의결)",
    executiveCommittee: {
      title: "집행위원회",
      headName: "송용도 (집행위원장)",
    },
    secretariat: {
      title: "사무처",
      headName: "곽상도 (사무처장)",
    },
  },
  committees: [
    { name: "정책위원회", headName: "박정희" },
    { name: "기획위원회", headName: "정경탁" },
    { name: "여성위원회", headName: "이경애" },
    { name: "환경위원회", headName: "배충식" },
    { name: "청년위원회", headName: "최정현" },
    { name: "다문화인권위원회", headName: "박승국" },
    { name: "시민문화예술위원회", headName: "김은미" },
    { name: "군공항이주민 대책특별위원회", headName: "허현" },
  ] as CommitteeItem[],
};
