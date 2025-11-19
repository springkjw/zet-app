import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { CONTENT_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export default function useStyle() {
  const { flex, padding, size, layout, border, font } = useBaseStyle();

  return StyleSheet.create({
    ProfileInfoContainer: {
      ...padding<ViewStyle>({ vertical: CONTENT_PADDING }),
      ...flex<ViewStyle>({
        direction: "column",
        justify: "flex-start",
        align: "flex-start",
        gap: 16,
      }),
    },
    ProfileInfoUserContainer: {
      ...flex<ViewStyle>({
        direction: "row",
        align: "flex-start",
        gap: CONTENT_PADDING,
      }),
    },
    ProfileInfoIconContainer: {
      ...size<ViewStyle>({ width: 56, height: 56 }),
      ...layout({
        color: colors.GRAY[700],
      }),
      ...border({
        color: colors.GRAY[600],
        width: 2,
        radius: 112,
      }),
      ...flex<ViewStyle>({ justify: "center", align: "center" }),
    },
    ProfileInfoNickname: {
      ...font({ size: 18, color: colors.COMMON[100], height: 32, weight: 700 }),
    },
  });
}
