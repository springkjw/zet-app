import type { TSize, TVariant } from "@/types";

export interface IBaseButtonProps {
  label?: string;
  height?: number;
  radius?: number;
  disabled?: boolean;
  variant?: TVariant;
  size?: TSize;
}

export interface IBaseButtonStyle {
  height?: number;
  radius?: number;
  variant: TVariant;
  size: TSize;
  disabled: boolean;
  pressed: boolean;
}

export interface IBaseButtonTextStyle {
  disabled: boolean;
  variant?: TVariant;
}
