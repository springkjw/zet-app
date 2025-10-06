export type TVariant = "primary" | "outline";
export type TSize = "small" | "medium" | "large";
export type TFontWeight = "medium" | "semibold" | "bold";

export interface IOptions {
  label: string;
  value: number;
}

export enum ItemChipType {
  DEFAULT = "default",
  ZET_PICK = "zet_pick",
  PRICE = "price",
  LARGE = "large",
  MEDIUM = "medium",
}
