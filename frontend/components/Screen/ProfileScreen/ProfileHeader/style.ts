import { StyleSheet } from "react-native";

import { NAV_HEIGHT } from "@/constants";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export default function useStyle() {
  const { flex, padding, size } = useBaseStyle();

  return StyleSheet.create({
    SettingsButton: {
      ...size<ViewStyle>({ width: NAV_HEIGHT, height: NAV_HEIGHT }),
      ...flex<ViewStyle>({ justify: "center", align: "center" }),
    },
  });
}
