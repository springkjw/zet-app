import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { font } = useBaseStyle();

  return StyleSheet.create({
    OnboardingStepText: {
      ...font({ size: 18, color: colors.GRAY[400] }),
    },
  });
}
