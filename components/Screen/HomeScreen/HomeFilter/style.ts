import { StyleSheet } from "react-native";

import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { size, padding, flex } = useBaseStyle();

  return StyleSheet.create({
    HomeFilter: {
      ...padding({ top: 4, left: 20 }),
    },
    HomeFilterHeaderContainer: {
      ...size({ height: 60 }),
      ...padding({ right: 10 }),
      ...flex({ direction: "row", justify: "space-between", align: "center" }),
    },
    HomeFilterHeaderButton: {
      ...size({ width: 40, height: 60 }),
      ...flex({ justify: "center", align: "center" }),
    },
    HomeFilterContainer: {
      ...size({ width: "100%" }),
      ...flex({
        direction: "column",
        justify: "flex-start",
        align: "flex-start",
        gap: 14,
      }),
    },
    HomeFilterItem: {
      ...flex({
        direction: "row",
        justify: "flex-start",
        align: "center",
        gap: 16,
      }),
      ...size({ width: "100%" }),
    },
    HomeFilterItemLabelContainer: {
      ...flex({
        direction: "row",
        justify: "flex-start",
        align: "center",
        gap: 6,
        flex: 1,
      }),
    },
    HomeFilterItemLabel: {
      ...size({ width: 50 }),
    },
    HomeFilterItemSeparator: {
      ...size({ width: 6 }),
    },
    HomeFilterListContainer: {},
  });
}
