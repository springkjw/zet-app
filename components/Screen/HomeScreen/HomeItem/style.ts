import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle, useWindowDimensions } from "@/hooks";

export default function useStyle() {
  const { width } = useWindowDimensions();
  const { size, layout, border, font } = useBaseStyle();

  return StyleSheet.create({
    HomeItem: {
      ...border({ radius: 8 }),
      ...size({ width: width - 40, minHeight: 100 }),
      ...layout({ color: colors.GRAY[700] }),
    },
    HomeItemTitle: {
      ...font({
        color: colors.COMMON[100],
        size: 14,
      }),
    },
  });
}
