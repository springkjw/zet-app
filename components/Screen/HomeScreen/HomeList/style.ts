import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, size, padding, font, layout, border, margin } = useBaseStyle();

  return StyleSheet.create({
    HomeList: {
      ...flex({ flex: 1 }),
      ...size({ width: "100%" }),
      ...padding({ horizontal: 20 }),
    },
    HomeListContentContainer: {
      ...padding({ vertical: 16 }),
    },
    HomeListSeparator: {
      ...size({ height: 16 }),
    },
    HomeListHeader: {
      ...size({ height: 34 }),
      ...padding({ horizontal: 16 }),
      ...layout({ color: colors.GRAY[900] }),
      ...flex({ direction: "row", justify: "flex-start", align: "center" }),
      ...border({ radius: 100 }),
      ...margin({ bottom: 16 }),
    },
    HomeListHeaderText: {
      ...font({
        size: 14,
        color: colors.GRAY[500],
      }),
    },
  });
}
