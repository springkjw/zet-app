import { StyleSheet } from "react-native";

import { CONTENT_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export default function useStyle() {
  const { size, padding, flex, margin } = useBaseStyle();

  return StyleSheet.create({
    HomeFilter: {
      ...padding<ViewStyle>({
        top: 4,
        left: CONTENT_PADDING,
      }),
    },
    HomeFilterHeaderContainer: {
      ...size<ViewStyle>({ height: 60 }),
      ...padding<ViewStyle>({ right: 10 }),
      ...flex<ViewStyle>({
        direction: "row",
        justify: "space-between",
        align: "center",
      }),
    },
    HomeFilterHeaderButton: {
      ...size<ViewStyle>({ width: 40, height: 60 }),
      ...flex<ViewStyle>({ justify: "center", align: "center" }),
    },
    HomeFilterContainer: {
      ...size<ViewStyle>({ width: "100%" }),
      ...flex<ViewStyle>({
        direction: "column",
        justify: "flex-start",
        align: "flex-start",
      }),
    },
    HomeFilterItem: {
      ...flex<ViewStyle>({
        direction: "row",
        justify: "flex-start",
        align: "center",
      }),
      ...size<ViewStyle>({ width: "100%" }),
      ...margin<ViewStyle>({ bottom: CONTENT_PADDING / 2 }),
    },
    HomeFilterItemLabelContainer: {
      ...flex<ViewStyle>({
        direction: "row",
        justify: "flex-start",
        align: "center",
        gap: 6,
        flex: 1,
      }),
    },
    HomeFilterItemLabel: {
      ...size<TextStyle>({ width: 50 }),
    },
    HomeFilterItemSeparator: {
      ...size<ViewStyle>({ width: 6 }),
    },
    HomeFilterListContainer: {},
  });
}
