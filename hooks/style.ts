import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/assets";
import { isValidStyleValue } from "@/utils";

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

/**
 * 타입 안전한 스타일 생성 헬퍼
 */
function createStyle<T extends ViewStyle | TextStyle | ImageStyle>(
  baseStyle: Partial<T> = {}
): T {
  return { ...baseStyle } as T;
}

/**
 * 타입 안전한 속성 설정
 */
function setProperty<T extends ViewStyle | TextStyle | ImageStyle>(
  style: T,
  key: keyof T,
  value: any
): void {
  if (isValidStyleValue(value)) {
    (style as any)[key] = value;
  }
}

export function useLayoutStyle() {
  // 함수 오버로딩: 제네릭 없이 호출 시 ViewStyle 반환
  function layout(style?: IStyleLayout): ViewStyle;
  function layout<T extends ViewStyle | TextStyle>(style?: IStyleLayout): T;
  function layout<T extends ViewStyle | TextStyle = ViewStyle>(
    style: IStyleLayout = {}
  ): T {
    const layoutStyle = createStyle<T>();

    setProperty(layoutStyle, "backgroundColor" as keyof T, style.color);
    setProperty(layoutStyle, "zIndex" as keyof T, style.index);
    setProperty(layoutStyle, "opacity" as keyof T, style.opacity);
    setProperty(layoutStyle, "overflow" as keyof T, style.overflow);

    return layoutStyle;
  }

  function flex(style?: IStyleFlex): ViewStyle;
  function flex<T extends ViewStyle | TextStyle>(style?: IStyleFlex): T;
  function flex<T extends ViewStyle | TextStyle = ViewStyle>(
    style: IStyleFlex = {}
  ): T {
    const flexStyle = createStyle<T>({
      alignItems: "center",
      justifyContent: "center",
    } as Partial<T>);

    setProperty(flexStyle, "flex" as keyof T, style.flex);
    setProperty(flexStyle, "flexDirection" as keyof T, style.direction);
    setProperty(flexStyle, "justifyContent" as keyof T, style.justify);
    setProperty(flexStyle, "alignItems" as keyof T, style.align);
    setProperty(flexStyle, "flexWrap" as keyof T, style.wrap);
    setProperty(flexStyle, "gap" as keyof T, style.gap);

    return flexStyle;
  }

  function position(style: IStylePosition): ViewStyle;
  function position<T extends ViewStyle | ImageStyle>(style: IStylePosition): T;
  function position<T extends ViewStyle | ImageStyle = ViewStyle>(
    style: IStylePosition
  ): T {
    const positionStyle = createStyle<T>({
      position: "absolute",
    } as Partial<T>);

    setProperty(positionStyle, "position" as keyof T, style.position);
    setProperty(positionStyle, "top" as keyof T, style.top);
    setProperty(positionStyle, "bottom" as keyof T, style.bottom);
    setProperty(positionStyle, "left" as keyof T, style.left);
    setProperty(positionStyle, "right" as keyof T, style.right);

    return positionStyle;
  }

  return { layout, flex, position };
}

export function useSpaceStyle() {
  function size(style: IStyleSize): ViewStyle;
  function size<T extends ViewStyle | ImageStyle | TextStyle>(style: IStyleSize): T;
  function size<T extends ViewStyle | ImageStyle | TextStyle = ViewStyle>(
    style: IStyleSize
  ): T {
    const sizeStyle = createStyle<T>();

    setProperty(sizeStyle, "width" as keyof T, style.width);
    setProperty(sizeStyle, "height" as keyof T, style.height);
    setProperty(sizeStyle, "maxWidth" as keyof T, style.maxWidth);
    setProperty(sizeStyle, "minWidth" as keyof T, style.minWidth);
    setProperty(sizeStyle, "maxHeight" as keyof T, style.maxHeight);
    setProperty(sizeStyle, "minHeight" as keyof T, style.minHeight);

    return sizeStyle;
  }

  function margin(style: IStyleMargin): ViewStyle;
  function margin<T extends ViewStyle | TextStyle>(style: IStyleMargin): T;
  function margin<T extends ViewStyle | TextStyle = ViewStyle>(
    style: IStyleMargin
  ): T {
    const marginStyle = createStyle<T>();

    const marginMap: Record<keyof IStyleMargin, string> = {
      left: "marginLeft",
      right: "marginRight",
      top: "marginTop",
      bottom: "marginBottom",
      horizontal: "marginHorizontal",
      vertical: "marginVertical",
    };

    Object.entries(style).forEach(([key, value]) => {
      if (isValidStyleValue(value)) {
        const marginKey = marginMap[key as keyof IStyleMargin];
        if (marginKey) {
          (marginStyle as any)[marginKey] = value;
        }
      }
    });

    return marginStyle;
  }

  function padding(style: IStylePadding): ViewStyle;
  function padding<T extends ViewStyle | TextStyle>(style: IStylePadding): T;
  function padding<T extends ViewStyle | TextStyle = ViewStyle>(
    style: IStylePadding
  ): T {
    const paddingStyle = createStyle<T>();

    const paddingMap: Record<keyof IStylePadding, string> = {
      left: "paddingLeft",
      right: "paddingRight",
      top: "paddingTop",
      bottom: "paddingBottom",
      horizontal: "paddingHorizontal",
      vertical: "paddingVertical",
    };

    Object.entries(style).forEach(([key, value]) => {
      if (isValidStyleValue(value)) {
        const paddingKey = paddingMap[key as keyof IStylePadding];
        if (paddingKey) {
          (paddingStyle as any)[paddingKey] = value;
        }
      }
    });

    return paddingStyle;
  }

  return { size, margin, padding };
}

export function useBorderStyle() {
  function border(style: IStyleBorder): ViewStyle;
  function border<T extends ViewStyle | TextStyle>(style: IStyleBorder): T;
  function border<T extends ViewStyle | TextStyle = ViewStyle>(
    style: IStyleBorder
  ): T {
    const borderStyle = createStyle<T>();

    setProperty(borderStyle, "borderWidth" as keyof T, style.width);
    setProperty(borderStyle, "borderColor" as keyof T, style.color);
    setProperty(borderStyle, "borderRadius" as keyof T, style.radius);

    if (isValidStyleValue(style.topRadius)) {
      (borderStyle as any).borderTopLeftRadius = style.topRadius;
      (borderStyle as any).borderTopRightRadius = style.topRadius;
    }

    if (isValidStyleValue(style.bottomRadius)) {
      (borderStyle as any).borderBottomLeftRadius = style.bottomRadius;
      (borderStyle as any).borderBottomRightRadius = style.bottomRadius;
    }

    if (isValidStyleValue(style.top)) {
      (borderStyle as any).borderTopWidth = style.top;
      if (isValidStyleValue(style.color)) {
        (borderStyle as any).borderTopColor = style.color;
      }
    }

    if (isValidStyleValue(style.bottom)) {
      (borderStyle as any).borderBottomWidth = style.bottom;
      if (isValidStyleValue(style.color)) {
        (borderStyle as any).borderBottomColor = style.color;
      }
    }

    if (isValidStyleValue(style.left)) {
      (borderStyle as any).borderLeftWidth = style.left;
      if (isValidStyleValue(style.color)) {
        (borderStyle as any).borderLeftColor = style.color;
      }
    }

    if (isValidStyleValue(style.right)) {
      (borderStyle as any).borderRightWidth = style.right;
      if (isValidStyleValue(style.color)) {
        (borderStyle as any).borderRightColor = style.color;
      }
    }

    return borderStyle;
  }

  return { border };
}

export function useFontStyle() {
  const font = (style: IStyleFont = {}): TextStyle => {
    const fontStyle: TextStyle = {
      fontFamily: "Pretendard",
      color: colors.GRAY[900],
      fontWeight: "500",
    };

    if (isValidStyleValue(style.size)) fontStyle.fontSize = style.size;
    if (isValidStyleValue(style.height)) fontStyle.lineHeight = style.height;
    if (isValidStyleValue(style.spacing)) fontStyle.letterSpacing = style.spacing;
    if (isValidStyleValue(style.color)) fontStyle.color = style.color;
    if (isValidStyleValue(style.align)) fontStyle.textAlign = style.align;
    if (isValidStyleValue(style.decoration)) fontStyle.textDecorationLine = style.decoration;
    if (isValidStyleValue(style.weight)) {
      fontStyle.fontWeight = style.weight as TextStyle["fontWeight"];
    }

    return fontStyle;
  };

  return { font };
}

/**
 * Shadow 스타일 전용 훅
 */
export function useShadowStyle() {
  const shadow = (config: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  } = {}): ViewStyle => {
    const shadowStyle: ViewStyle = {};

    if (isValidStyleValue(config.color)) shadowStyle.shadowColor = config.color;
    if (isValidStyleValue(config.offset)) shadowStyle.shadowOffset = config.offset;
    if (isValidStyleValue(config.opacity)) shadowStyle.shadowOpacity = config.opacity;
    if (isValidStyleValue(config.radius)) shadowStyle.shadowRadius = config.radius;
    if (isValidStyleValue(config.elevation)) shadowStyle.elevation = config.elevation;

    return shadowStyle;
  };

  return { shadow };
}

export function useBaseStyle() {
  const { layout, flex, position } = useLayoutStyle();
  const { size, margin, padding } = useSpaceStyle();
  const { border } = useBorderStyle();
  const { font } = useFontStyle();
  const { shadow } = useShadowStyle();
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
    shadow,
    width,
    height,
    insets,
  };
}

export { useSafeAreaInsets, useWindowDimensions };
