import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { BORDER_RADIUS, HORIZONTAL_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, layout, padding, margin, border, size } = useBaseStyle();

  return StyleSheet.create({
    BaseModalBackground: {
      ...size({ height: 0 }),
    },
    BaseModalBackdrop: {
      ...layout({ color: colors.GRAY[800] }),
      opacity: 0.5,
    },
    BaseModalContainer: {
      ...margin({ horizontal: HORIZONTAL_PADDING }),
      ...border({ radius: BORDER_RADIUS, width: 0 }),
    },
    BaseModalContent: {
      ...layout({ color: colors.GRAY[700] }),
      ...padding({ horizontal: HORIZONTAL_PADDING, vertical: 20 }),
      ...border({ radius: 16, width: 0 }),
    },
    BaseModalButtonContainer: {
      ...padding({ top: 16 }),
      ...flex({
        direction: "row",
        justify: "center",
        align: "center",
        gap: 12,
      }),
    },
    BaseModalButton: {
      ...flex({ flex: 1 }),
      ...border({ radius: 10 }),
    },
  });
}
