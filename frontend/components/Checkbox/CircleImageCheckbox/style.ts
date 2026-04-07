import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

import type { ImageStyle } from "react-native";
import type { ICircleImageCheckboxStyle } from "./type";

export default function useStyle({
  checked = false,
}: ICircleImageCheckboxStyle) {
  const { size, flex, border, font, layout, position } = useBaseStyle();

  return StyleSheet.create({
    CircleImageCheckbox: {
      ...flex({
        direction: "column",
        align: "center",
        justify: "center",
        gap: 4,
      }),
      ...size({ width: 60 }),
    },
    CircleImageCheckboxImageContainer: {
      ...size({ width: 60, height: 60 }),
      ...border({
        radius: 120,
        width: 2,
        color: checked ? colors.RED[600] : colors.GRAY[700],
      }),
      ...position({ position: "relative" }),
      ...layout({ overflow: "hidden" }),
    },
    CircleImageCheckboxMask: {
      ...size({ width: 60, height: 60 }),
      ...layout({ color: colors.RED[600], opacity: 0.6, index: 1 }),
      ...position({ position: "absolute", top: 0, left: 0 }),
    },
    CircleImageCheckboxImage: {
      ...size<ImageStyle>({ width: 60, height: 60 }),
      ...position<ImageStyle>({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }),
    },
    CircleImageLabelText: {
      ...font({
        size: 14,
        weight: 600,
        color: colors.COMMON[100],
      }),
    },
  });
}
