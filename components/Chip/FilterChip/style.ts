import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export function useStyle() {
  const { size, flex, layout, border } = useBaseStyle();

  return StyleSheet.create({
    FilterChip: {
      ...size({ height: 26 }),
      ...flex(),
      ...layout(),
      ...border({ radius: 100, width: 1, color: colors.GRAY[700] }),
    },
  });
}
