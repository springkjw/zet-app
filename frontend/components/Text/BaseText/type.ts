import type { TFontWeight } from "@/types";
import type { ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";

export interface IBaseTextProps {
  children?: ReactNode;
  size?: number;
  color?: string;
  weight?: TFontWeight;
  style?: StyleProp<TextStyle>;
}

export interface IBaseTextStyle {
  size: number;
  weight: TFontWeight;
  color?: string;
}
