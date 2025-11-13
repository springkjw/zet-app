import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, size, font, width } = useBaseStyle();

  return StyleSheet.create({
    StartActionContainer: {},
    StartActionAgreeContainer: {
      ...flex({ direction: "row", justify: "center", align: "center", gap: 4 }),
      ...size({ height: 40 }),
    },
    StartActionAgreeText: {
      ...font({ size: 12, color: colors.GRAY[500], height: 20 }),
    },
    StartActionAgreeTextLink: {
      ...font({
        size: 12,
        color: colors.GRAY[500],
        height: 20,
        decoration: "underline",
      }),
    },
    StartActionButtonContainer: {
      ...flex({ justify: "center", align: "center" }),
      ...size({ width: width - 36, height: 48 }),
    },
    StartActionButtonLabel: {
      ...font({ color: colors.COMMON[100], size: 16, weight: 600 }),
    },
  });
}
