import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export function useStyle() {
  const { font, size, padding, flex, layout, border } = useBaseStyle();

  return StyleSheet.create({
    FilterChip: {
      ...size({ height: 32 }),
      ...flex({}),
      ...border({ radius: 100, width: 1, color: colors.GRAY[700] }),
      ...padding({ horizontal: 10 }),
    },
    FilterChipText: {
      ...font({
        size: 14,
        color: colors.GRAY[400],
      }),
    },
  });
}
