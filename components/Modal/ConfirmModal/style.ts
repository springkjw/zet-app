import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, layout, padding, margin, border, size } = useBaseStyle();

  return StyleSheet.create({
    ConfirmModalBackground: {
      ...size({ height: 0 }),
    },
    ConfirmModalBackdrop: {
      ...layout({ color: colors.GRAY[700] }),
      opacity: 0.5,
    },
    ConfirmModalContainer: {
      ...margin({ horizontal: 20 }),
      ...border({ radius: 16, width: 0 }),
    },
    ConfirmModalContent: {
      ...layout({ color: colors.GRAY[700] }),
      ...padding({ horizontal: 20, vertical: 20 }),
      ...border({ radius: 16, width: 0 }),
    },
    ConfirmModalButtonContainer: {
      ...padding({ top: 16 }),
      ...flex({
        direction: "row",
        justify: "center",
        align: "center",
        gap: 12,
      }),
    },
    ConfirmModalButton: {
      ...flex({ flex: 1 }),
      ...border({ radius: 10 }),
    },
  });
}
