import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export default function useStyle() {
  const { flex, size, padding, font, layout, border, margin } = useBaseStyle();

  return StyleSheet.create({
    HomeList: {
      ...flex<ViewStyle>({ flex: 1 }),
      ...size<ViewStyle>({ width: "100%" }),
      ...padding<ViewStyle>({ horizontal: 20 }),
    },
    HomeListContentContainer: {
      ...padding<ViewStyle>({ vertical: 16 }),
    },
    HomeListSeparator: {
      ...size<ViewStyle>({ height: 16 }),
    },
    HomeListHeader: {
      ...size<ViewStyle>({ height: 34 }),
      ...padding<ViewStyle>({ horizontal: 16 }),
      ...layout<ViewStyle>({ color: colors.GRAY[900] }),
      ...flex<ViewStyle>({
        direction: "row",
        justify: "flex-start",
        align: "center",
      }),
      ...border<ViewStyle>({ radius: 100 }),
      ...margin<ViewStyle>({ bottom: 16 }),
    },
    HomeListHeaderText: {
      ...font({
        size: 14,
        color: colors.GRAY[500],
      }),
    },
  });
}
