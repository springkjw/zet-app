import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

import type { IBaseButtonStyle, IBaseButtonTextStyle } from "./type";

export function useStyle({
  height,
  radius,
  variant,
  size: buttonSize,
  disabled,
  pressed,
}: IBaseButtonStyle) {
  const { size, flex, layout, border } = useBaseStyle();

  const backgroundColor = useMemo(() => {
    if (disabled) {
      return colors.GRAY[700];
    }

    switch (variant) {
      case "outline":
        if (pressed) {
          return colors.GRAY[700];
        }
        return colors.GRAY[800];
      default:
        if (pressed) {
          return colors.RED[800];
        }
        return colors.RED[600];
    }
  }, [variant, pressed, disabled]);

  const buttonHeight = useMemo(() => {
    if (height) {
      return height;
    }

    switch (buttonSize) {
      case "small":
        return 36;
      case "medium":
        return 48;
      default:
        return 64;
    }
  }, [height, buttonSize]);

  const buttonBorder = useMemo(() => {
    if (variant === "outline") {
      return { color: colors.GRAY[600], width: 1 };
    }

    return {};
  }, [variant]);

  const buttonRadius = useMemo(() => {
    if (radius) {
      return radius;
    }

    switch (buttonSize) {
      case "small":
        return 4;
      case "medium":
        return 10;
      default:
        return 100;
    }
  }, [radius]);

  return StyleSheet.create({
    BaseButton: {
      ...flex(),
      ...layout({ color: backgroundColor }),
      ...size({ height: buttonHeight }),
      ...border({ radius: buttonRadius, ...buttonBorder }),
    },
  });
}

export function useTextStyle({ variant, disabled }: IBaseButtonTextStyle) {
  const fontColor = useMemo(() => {
    if (disabled) {
      return colors.GRAY[500];
    }

    switch (variant) {
      case "primary":
        return colors.COMMON[100];
      case "outline":
        return colors.PURPLE[600];
      default:
        return colors.GRAY[900];
    }
  }, [variant, disabled]);

  return { color: fontColor };
}
