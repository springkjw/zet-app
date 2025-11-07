import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";
import { StyleSheet } from "react-native";

export default function useStyle() {
  const { flex, size, padding, width, font } = useBaseStyle();

  return StyleSheet.create({
    OnboardingShopFormContainer: {
      ...flex({ flex: 1, justify: "center", align: "flex-start" }),
      ...size({ width }),
      ...padding({ horizontal: 20 }),
    },
    OnboardingShopFormTitle: {
      ...font({
        color: colors.COMMON[100],
        size: 24,
        weight: 600,
        height: 32,
      }),
    },
  });
}
