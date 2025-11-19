import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export function useStyle() {
  const { font, size, padding, flex, layout, border } = useBaseStyle();

  return StyleSheet.create({
    FilterChip: {
      ...size<ViewStyle>({ height: 32 }),
      ...flex<ViewStyle>({}),
      ...border({ radius: 100, width: 1, color: colors.GRAY[700] }),
      ...padding<ViewStyle>({ horizontal: 10 }),
    },
    FilterChipText: {
      ...font({
        size: 14,
        color: colors.GRAY[400],
      }),
    },
  });
}
