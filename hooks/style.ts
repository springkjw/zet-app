import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/assets";
import { setStyleValue } from "@/utils";

import type {
  IStyleBorder,
  IStyleFlex,
  IStyleFont,
  IStyleLayout,
  IStyleMargin,
  IStylePadding,
  IStylePosition,
  IStyleSize,
} from "@/types";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

export function useLayoutStyle() {
  const layout = (style: IStyleLayout = {}) => {
    const layoutStyle: ViewStyle = {};
    setStyleValue(layoutStyle, "backgroundColor", style.color);
    setStyleValue(layoutStyle, "zIndex", style.index);
    setStyleValue(layoutStyle, "opacity", style.opacity);
    setStyleValue(layoutStyle, "overflow", style.overflow);
    return layoutStyle;
  };

  const flex = (style: IStyleFlex = {}): ViewStyle | TextStyle => {
    const flexStyle: ViewStyle = {
      alignItems: "center",
      justifyContent: "center",
    };

    setStyleValue(flexStyle, "flex", style.flex);
    setStyleValue(flexStyle, "flexDirection", style.direction);
    setStyleValue(flexStyle, "justifyContent", style.justify);
    setStyleValue(flexStyle, "alignItems", style.align);
    setStyleValue(flexStyle, "flexWrap", style.wrap);
    setStyleValue(flexStyle, "gap", style.gap);
    return flexStyle;
  };

  const position = <T extends ViewStyle | ImageStyle = ViewStyle>(
    style: IStylePosition
  ): T => {
    const positionStyle = {
      position: "absolute",
    } as T;

    setStyleValue(positionStyle, "position", style.position);
    setStyleValue(positionStyle, "top", style.top);
    setStyleValue(positionStyle, "bottom", style.bottom);
    setStyleValue(positionStyle, "left", style.left);
    setStyleValue(positionStyle, "right", style.right);

    return positionStyle;
  };

  return { layout, flex, position };
}

export function useSpaceStyle() {
  const size = <T extends ViewStyle | ImageStyle = ViewStyle>(
    style: IStyleSize
  ): T => {
    const sizeStyle = {} as T;
    setStyleValue(sizeStyle, "width", style.width);
    setStyleValue(sizeStyle, "height", style.height);
    setStyleValue(sizeStyle, "maxWidth", style.maxWidth);
    setStyleValue(sizeStyle, "minWidth", style.minWidth);
    setStyleValue(sizeStyle, "maxHeight", style.maxHeight);
    setStyleValue(sizeStyle, "minHeight", style.minHeight);
    return sizeStyle;
  };

  const margin = (style: IStyleMargin): ViewStyle | TextStyle => {
    const marginStyle: ViewStyle = {};

    Object.entries(style).forEach(([key, value]) => {
      if (value !== undefined) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        const marginKey = `margin${capitalizedKey}` as keyof ViewStyle;
        marginStyle[marginKey] = value;
      }
    });
    return marginStyle;
  };

  const padding = (style: IStylePadding): ViewStyle | TextStyle => {
    const paddingStyle: ViewStyle = {};

    Object.entries(style).forEach(([key, value]) => {
      if (value !== undefined) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        const paddingKey = `padding${capitalizedKey}` as keyof ViewStyle;
        paddingStyle[paddingKey] = value;
      }
    });
    return paddingStyle;
  };

  return { size, margin, padding };
}

export function useBorderStyle() {
  const border = (style: IStyleBorder) => {
    const borderStyle: ViewStyle = {};

    setStyleValue(borderStyle, "borderWidth", style.width);
    setStyleValue(borderStyle, "borderColor", style.color);
    setStyleValue(borderStyle, "borderRadius", style.radius);

    if (style.topRadius) {
      borderStyle.borderTopLeftRadius = style.topRadius;
      borderStyle.borderTopRightRadius = style.topRadius;
    }

    if (style.bottomRadius) {
      borderStyle.borderBottomLeftRadius = style.bottomRadius;
      borderStyle.borderBottomRightRadius = style.bottomRadius;
    }

    if (style.top) {
      borderStyle.borderTopWidth = style.top;
      borderStyle.borderTopColor = style.color;
    }

    if (style.bottom) {
      borderStyle.borderBottomWidth = style.bottom;
      borderStyle.borderBottomColor = style.color;
    }

    if (style.left) {
      borderStyle.borderLeftWidth = style.left;
      borderStyle.borderLeftColor = style.color;
    }

    if (style.right) {
      borderStyle.borderRightWidth = style.right;
      borderStyle.borderRightColor = style.color;
    }
    return borderStyle;
  };

  return { border };
}

export function useFontStyle() {
  const font = (style: IStyleFont = {}): TextStyle => {
    const fontStyle: TextStyle = {
      fontFamily: "Pretendard",
      color: colors.GRAY[900],
      fontWeight: "500",
    };

    setStyleValue(fontStyle, "fontSize", style.size);
    setStyleValue(fontStyle, "lineHeight", style.height);
    setStyleValue(fontStyle, "letterSpacing", style.spacing);
    setStyleValue(fontStyle, "color", style.color);
    setStyleValue(fontStyle, "textAlign", style.align);
    setStyleValue(fontStyle, "textDecorationLine", style.decoration);
    setStyleValue(fontStyle, "fontWeight", style.weight);

    return fontStyle;
  };

  return { font };
}

export function useBaseStyle() {
  const { layout, flex, position } = useLayoutStyle();
  const { size, margin, padding } = useSpaceStyle();
  const { border } = useBorderStyle();
  const { font } = useFontStyle();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return {
    layout,
    size,
    flex,
    margin,
    padding,
    border,
    font,
    position,
    width,
    height,
    insets,
  };
}

export { useSafeAreaInsets, useWindowDimensions };
