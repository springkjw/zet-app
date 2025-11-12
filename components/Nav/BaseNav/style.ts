import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { NAV_HEIGHT } from "@/constants";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { size, padding, flex, insets, font, position, layout } =
    useBaseStyle();

  return StyleSheet.create({
    BaseNavContainer: {
      ...position({ position: "relative" }),
      ...size({ width: "100%", height: NAV_HEIGHT + insets.top }),
      ...padding({ top: insets.top }),
      ...flex({
        direction: "row",
        justify: "space-between",
        align: "flex-end",
      }),
    },
    BaseNavBackButton: {
      ...layout({ index: 1 }),
      ...size({ width: NAV_HEIGHT, height: NAV_HEIGHT }),
      ...flex({ justify: "center", align: "center" }),
    },
    BaseNavContent: {
      ...layout({ index: 0 }),
      ...position({ position: "absolute", bottom: 0, left: 0, right: 0 }),
      ...size({ height: NAV_HEIGHT }),
      ...flex({ justify: "center", align: "center" }),
    },
    BaseNavTitle: {
      ...font({ size: 18, weight: 700, color: colors.COMMON[100] }),
    },
    BaseNavRightContent: {
      ...layout({ index: 1 }),
      ...size({ height: NAV_HEIGHT }),
      ...flex({ justify: "center", align: "center" }),
    },
  });
}
