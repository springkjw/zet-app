import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export function useStyle() {
  const { font, size, padding, flex, layout, border } = useBaseStyle();

  return StyleSheet.create({
    FilterChip: {
      ...size({ height: 26 }),
      ...flex(),
      ...layout(),
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
