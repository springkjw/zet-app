import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle } from "@/hooks";

import type { IOnboardingNicknameFormStyle } from "./type";

export default function useStyle({
  hasError = false,
}: IOnboardingNicknameFormStyle) {
  const { flex, font, border, size, padding, width } = useBaseStyle();

  return StyleSheet.create({
    OnboardingNicknameFormContainer: {
      ...flex({ flex: 1, justify: "center", align: "flex-start" }),
      ...size({ width }),
      ...padding({ horizontal: 20 }),
    },
    OnboardingNicknameFormInnerContainer: {
      ...size({ maxWidth: 286 }),
      ...flex({
        direction: "column",
        justify: "center",
        align: "flex-start",
        gap: 24,
      }),
    },
    OnboardingNicknameFormTopContainer: {
      ...size({ width: "100%" }),
      ...flex({
        direction: "column",
        justify: "flex-start",
        align: "flex-start",
        gap: 12,
      }),
    },
    OnboardingNicknameFormTopInnerContainer: {
      ...size({ width: "100%" }),
      ...flex({
        direction: "row",
        justify: "flex-start",
        align: "center",
        gap: 12,
      }),
    },
    OnboardingNicknameFormInputContainer: {
      ...border({
        bottom: hasError ? 2 : 1,
        color: hasError ? colors.RED[900] : colors.COMMON[100],
      }),
      ...size({ width: "100%", height: 36 }),
      ...padding({ bottom: 4 }),
    },
    OnboardingNicknameFormInput: {
      ...font({
        size: 24,
        color: colors.COMMON[100],
        weight: 600,
        height: 28,
        spacing: 1.5,
      }),
    },
    OnboardingNicknameFormCountText: {
      ...font({
        size: 14,
        color: colors.COMMON[100],
        weight: 600,
        height: 20,
        spacing: -0.48,
      }),
    },
    OnboardingNicknameFormLabel: {
      ...font({
        size: 24,
        color: colors.COMMON[100],
        weight: 600,
        height: 32,
        spacing: -0.48,
      }),
    },
    OnboardingNicknameFormErrorText: {
      ...font({
        size: 14,
        color: colors.RED[900],
        weight: 600,
        height: 20,
        spacing: -0.48,
      }),
    },
  });
}
