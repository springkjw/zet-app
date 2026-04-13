import type { IHomeFilterData } from "./type";

export const homeFilterData: IHomeFilterData[] = [
  {
    label: "브랜드",
    options: [
      { label: "코카콜라", value: 0 },
      { label: "펩시", value: 1 },
    ],
  },
  {
    label: "용량",
    options: [
      { label: "190ml~210ml", value: 0 },
      { label: "210ml", value: 1 },
      { label: "350ml", value: 2 },
      { label: "355ml", value: 3 },
    ],
  },
  {
    label: "쇼핑몰",
    options: [
      { label: "쿠팡", value: 0 },
      { label: "G마켓", value: 1 },
      { label: "11번가", value: 4 },
    ],
  },
  {
    label: "할인율",
    options: [
      { label: "제트픽", value: 0 },
      { label: "대박", value: 1 },
      { label: "중박", value: 4 },
      { label: "소박", value: 4 },
      { label: "일반", value: 4 },
    ],
  },
];
