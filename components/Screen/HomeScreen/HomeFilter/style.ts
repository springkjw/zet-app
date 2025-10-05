import { StyleSheet } from "react-native";

import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { size, padding, flex } = useBaseStyle();

  return StyleSheet.create({
    HomeFilter: {
      ...padding({ top: 4, bottom: 20, left: 20 }),
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
    HomeFilterContainer: {},
    HomeFilterItem: {},
    HomeFilterItemLabel: {
      ...size({ width: 65 }),
    },
  });
}
