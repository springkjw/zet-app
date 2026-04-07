import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { BORDER_RADIUS, CONTENT_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, size, padding, font, border, layout, position } =
    useBaseStyle();

  return StyleSheet.create({
    BaseMenuContainer: {
      ...size({ width: "100%", height: 56 }),
      ...flex({
        direction: "column",
        justify: "flex-start",
        align: "flex-start",
      }),
      ...layout({ color: colors.GRAY[700] }),
      ...position({ position: "relative" }),
    },
    BaseMenuContainerTop: {
      ...border({ topRadius: BORDER_RADIUS }),
    },
    BaseMenuContainerBottom: {
      ...border({ bottomRadius: BORDER_RADIUS }),
    },
    BaseMenuContainerBorder: {
      ...size({ height: 1 }),
      ...layout({ color: colors.GRAY[600] }),
      ...position({
        position: "absolute",
        bottom: 0,
        left: CONTENT_PADDING,
        right: 0,
      }),
    },
    BaseMenuButton: {
      ...flex({ direction: "row", justify: "space-between", align: "center" }),
      ...size({ width: "100%", height: "100%" }),
      ...padding({ horizontal: CONTENT_PADDING }),
    },
    BaseMenuButtonLabel: {
      ...font({ size: 16, weight: 600, color: colors.COMMON[100] }),
    },
  });
}
