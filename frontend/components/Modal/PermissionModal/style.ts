import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, layout, padding, margin, border, size } = useBaseStyle();

  return StyleSheet.create({
    PermissionModalBackground: {
      ...size({ height: 0 }),
    },
    PermissionModalBackdrop: {
      ...layout({ color: colors.GRAY[700] }),
      opacity: 0.5,
    },
    PermissionModalContainer: {
      ...margin({ horizontal: 20 }),
      ...border({ radius: 16, width: 0 }),
    },
    PermissionModalContent: {
      ...layout({ color: colors.GRAY[700] }),
      ...padding({ horizontal: 20, vertical: 20 }),
      ...border({ radius: 16, width: 0 }),
    },
    PermissionModalButtonContainer: {
      ...padding({ top: 16 }),
      ...flex({
        direction: "row",
        justify: "center",
        align: "center",
      }),
    },
    PermissionModalButton: {
      ...flex({ flex: 1 }),
      ...border({ radius: 10 }),
    },
  });
}
