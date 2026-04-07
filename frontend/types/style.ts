import type { DimensionValue } from "react-native";

export interface IStyleLayout {
  color?: string;
  index?: number;
  opacity?: number;
  overflow?: "visible" | "hidden" | "scroll";
}

export interface IStyleSize {
  width?: DimensionValue;
  height?: DimensionValue;
  maxWidth?: DimensionValue;
  minWidth?: DimensionValue;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
}

export interface IStyleFlex {
  flex?: number;
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number;
}

export interface IStyleMargin {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  horizontal?: number;
  vertical?: number;
}

export interface IStylePadding {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  horizontal?: number;
  vertical?: number;
}

export interface IStyleBorder {
  color?: string;
  radius?: number;
  topRadius?: number;
  bottomRadius?: number;
  width?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface IStylePosition {
  position?: "absolute" | "relative";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  index?: number;
}

export interface IStyleFont {
  size?: number;
  height?: number;
  color?: string;
  spacing?: number;
  weight?: number;
  align?: "left" | "center" | "right";
  decoration?: "underline" | "line-through";
}
