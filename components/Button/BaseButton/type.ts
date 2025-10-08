import type { TSize, TVariant } from "@/types";
import type { ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IBaseButtonProps {
  label?: string;
  height?: number;
  radius?: number;
  disabled?: boolean;
  variant?: TVariant;
  size?: TSize;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
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
