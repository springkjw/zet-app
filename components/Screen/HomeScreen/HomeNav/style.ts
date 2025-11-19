import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

import { HORIZONTAL_PADDING, NAV_HEIGHT } from "@/constants";
import { useBaseStyle, useSafeAreaInsets } from "@/hooks";

export default function useStyle() {
  const { flex, padding, margin, size } = useBaseStyle();
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    HomeNav: {
      ...size<ViewStyle>({ height: NAV_HEIGHT + insets.top }),
      ...padding<ViewStyle>({ top: insets.top }),
      ...flex<ViewStyle>({
        direction: "row",
        justify: "space-between",
        align: "flex-end",
      }),
    },
    HomeNavLogoContainer: {
      ...padding<ViewStyle>({ left: HORIZONTAL_PADDING }),
      ...margin<ViewStyle>({ bottom: 8 }),
      ...size<ViewStyle>({ width: 40, height: 40 }),
    },
    HomeNavLogo: {
      ...size<ImageStyle>({ width: 40, height: 40 }),
    },
    HomeNavButtonContainer: {
      ...padding<ViewStyle>({ right: HORIZONTAL_PADDING / 2 }),
      ...size<ViewStyle>({ height: NAV_HEIGHT }),
      ...flex<ViewStyle>({
        direction: "row",
        justify: "center",
        align: "center",
      }),
    },
    HomeNavButton: {
      ...size<ViewStyle>({ width: NAV_HEIGHT, height: NAV_HEIGHT }),
      ...flex<ViewStyle>({ justify: "center", align: "center" }),
    },
  });
}
