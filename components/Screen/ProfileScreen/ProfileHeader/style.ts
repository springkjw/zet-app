import { StyleSheet } from "react-native";

import { NAV_HEIGHT } from "@/constants";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, padding, size } = useBaseStyle();

  return StyleSheet.create({
    SettingsButton: {
      ...size({ width: NAV_HEIGHT, height: NAV_HEIGHT }),
      ...flex({ justify: "center", align: "center" }),
    },
  });
}
