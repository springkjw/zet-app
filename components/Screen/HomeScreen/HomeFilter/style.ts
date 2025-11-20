import { StyleSheet, TextStyle } from "react-native";

import { CONTENT_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { size, padding, flex, margin } = useBaseStyle();

  return StyleSheet.create({
    HomeFilter: {
      ...padding({
        top: 4,
        left: CONTENT_PADDING,
      }),
    },
    HomeFilterHeaderContainer: {
      ...size({ height: 60 }),
      ...padding({ right: 10 }),
      ...flex({
        direction: "row",
        justify: "space-between",
        align: "center",
      }),
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
      }),
    },
    HomeFilterItem: {
      ...flex({
        direction: "row",
        justify: "flex-start",
        align: "center",
      }),
      ...size({ width: "100%" }),
      ...margin({ bottom: CONTENT_PADDING / 2 }),
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
      ...size<TextStyle>({ width: 50 }),
    },
    HomeFilterItemSeparator: {
      ...size({ width: 6 }),
    },
    HomeFilterListContainer: {},
  });
}
