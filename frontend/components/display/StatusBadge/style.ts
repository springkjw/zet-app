import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { size, flex, border, padding, font } = useBaseStyle();

  return StyleSheet.create({
    StatusBadge: {
      ...size({ width: 68, height: 24 }),
      ...flex(),
      ...border({ radius: 4 }),
      ...padding({ horizontal: 6.5 }),
    },
    StatusBadgeText: {
      ...font({
        color: colors.GRAY[900],
        size: 12,
      }),
    },
  });
}
