import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { useBaseStyle } from "@/hooks";

import type { IBaseTextStyle } from "./type";

export default function useStyle({ size, weight, color }: IBaseTextStyle) {
  const { font } = useBaseStyle();

  const lineHeight = useMemo(() => {
    return size * 1.5;
  }, [size]);

  const fontSpacing = useMemo(() => {
    if (size >= 24) {
      return -0.48;
    } else if (size >= 22) {
      return -0.44;
    } else if (size >= 20) {
      return -0.4;
    } else if (size >= 18) {
      return -0.36;
    } else if (size >= 16) {
      return -0.32;
    } else if (size >= 14) {
      return -0.28;
    } else {
      return -0.24;
    }
  }, [size]);

  const fontWeight = useMemo(() => {
    switch (weight) {
      case "bold":
        return 700;
      case "semibold":
        return 600;
      default:
        return 500;
    }
  }, [weight]);

  return StyleSheet.create({
    BaseText: {
      ...font({
        color,
        size,
        height: lineHeight,
        spacing: fontSpacing,
        weight: fontWeight,
      }),
    },
  });
}
