export interface MediaAlbum {
  id: string;
  slug: string;
  title: string;
  date: string;
  type: "photo" | "video";
  coverImage: string;
  description: string;
  photoList?: string[];
  youtubeVideoId?: string;
  isVideoPending?: boolean;
}

export const MEDIA_CATEGORIES = ["전체", "사진", "영상"];

export const MEDIA_DATA: MediaAlbum[] = [
  {
    id: "med-1",
    slug: "inaugural-album",
    title: "무안 자치주권시민연대 창립총회 현장",
    date: "2026.07.24",
    type: "photo",
    coverImage: "/inaugural_assembly.jpg",
    description:
      "2026년 7월 24일 무안 승달문화예술회관에서 군민들과 함께 개최한 무안 자치주권시민연대 창립총회 공식 화보입니다.",
    photoList: [
      "/inaugural_assembly.jpg",
      "/inaugural_assembly.jpg",
      "/inaugural_assembly.jpg",
      "/inaugural_assembly.jpg",
    ],
  },
  {
    id: "med-2",
    slug: "initiator-album",
    title: "무안 자치주권시민연대 발기인대회",
    date: "2026.05.06",
    type: "photo",
    coverImage: "/images/placeholders/media-default.svg",
    description:
      "시민주권 수호의 첫걸음을 뗀 발기인대회 현장 기록 사진 모음입니다.",
    photoList: ["/images/placeholders/media-default.svg"],
  },
  {
    id: "med-3",
    slug: "forum-video",
    title: "군공항 이전과 무안의 미래 포럼 생중계",
    date: "2026.05.14",
    type: "video",
    coverImage: "/images/placeholders/media-default.svg",
    description:
      "전남서부권 민생포럼 주제 발제 및 시민토론회 영상 기록입니다. (향후 공식 유튜브 채널과 연동 예정)",
    isVideoPending: true,
  },
  {
    id: "med-4",
    slug: "mokpo-album",
    title: "목포지역 시민단체 간담회 현장",
    date: "2026.07.15",
    type: "photo",
    coverImage: "/images/placeholders/media-default.svg",
    description:
      "서남권 지역 시민사회 간의 상호 협력 네트워크 구축을 위한 간담회 소통 기록입니다.",
    photoList: ["/images/placeholders/media-default.svg"],
  },
];
