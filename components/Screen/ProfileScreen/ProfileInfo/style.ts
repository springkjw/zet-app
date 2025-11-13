import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, padding, margin, size, layout, font } = useBaseStyle();

  return StyleSheet.create({
    ProfileInfo: {
      ...padding({ vertical: 40, horizontal: 20 }),
      ...flex({ direction: "column", align: "center", gap: 16 }),
    },
    ProfileInfoIconContainer: {
      ...size({ width: 80, height: 80 }),
      ...layout({
        color: colors.GRAY[700],
        borderColor: colors.GRAY[600],
        borderWidth: 2,
        borderRadius: 40,
      }),
      ...flex({ justify: "center", align: "center" }),
    },
    ProfileInfoNickname: {
      ...font({ size: 24, weight: "bold" }),
    },
  });
}
