import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, layout, padding, margin, border, size } = useBaseStyle();

  return StyleSheet.create({
    BaseModalBackground: {
      ...size({ height: 0 }),
    },
    BaseModalBackdrop: {
      ...layout({ color: colors.GRAY[700] }),
      opacity: 0.5,
    },
    BaseModalContainer: {
      ...margin({ horizontal: 20 }),
      ...border({ radius: 16, width: 0 }),
    },
    BaseModalContent: {
      ...layout({ color: colors.GRAY[700] }),
      ...padding({ horizontal: 20, vertical: 20 }),
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
