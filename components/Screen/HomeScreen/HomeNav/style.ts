import { StyleSheet } from "react-native";

import { useBaseStyle, useSafeAreaInsets } from "@/hooks";

export default function useStyle() {
  const { flex, padding, margin, size, layout } = useBaseStyle();
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    HomeNav: {
      ...size({ height: 56 + insets.top }),
      ...padding({ top: insets.top }),
      ...flex({
        direction: "row",
        justify: "space-between",
        align: "flex-end",
      }),
    },
    HomeNavLogoContainer: {
      ...padding({ horizontal: 20 }),
      ...margin({ bottom: 8 }),
      ...size({ width: 40, height: 40 }),
    },
    HomeNavLogo: {
      ...size({ width: 40, height: 40 }),
    },
    HomeNavButtonContainer: {
      ...size({ height: 56 }),
      ...flex({ direction: "row", justify: "center", align: "center" }),
      ...padding({ horizontal: 16 }),
    },
    HomeNavButton: {
      ...size({ width: 40, height: 56 }),
      ...flex({ justify: "center", align: "center" }),
    },
  });
}
