import { StyleSheet, ImageStyle } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle, useWindowDimensions } from "@/hooks";

export default function useStyle() {
  const { font, layout, flex, size, padding, border } = useBaseStyle();
  const { width } = useWindowDimensions();

  return StyleSheet.create({
    LoginContainer: {
      ...size({ height: 258 }),
      ...padding({ horizontal: 20, top: 40, bottom: 16 }),
    },
    LoginTitle: {
      ...flex({ justify: "center", align: "center" }),
      marginBottom: 24,
    },
    LoginActionContainer: {
      ...flex({ flex: 1 }),
    },
    LoginButtonContainer: {
      ...flex({
        direction: "column",
        justify: "center",
        align: "stretch",
        gap: 12,
      }),
    },
    LoginErrorBanner: {
      ...size({ width: width - 40 }),
      ...layout({ color: colors.RED[900] }),
      ...border({ width: 1, color: colors.RED[700], radius: 12 }),
      ...padding({ horizontal: 16, vertical: 12 }),
    },
    LoginErrorText: {
      ...font({
        color: colors.RED[100],
        size: 12,
      }),
    },
    LoginProviderButton: {
      ...size({ width: width - 40, height: 48 }),
      ...layout({ color: colors.COMMON[0] }),
      ...border({ width: 0, radius: 14 }),
      ...flex({
        direction: "row",
        justify: "center",
        align: "center",
        gap: 12,
      }),
    },
    LoginKakaoButton: {
      ...layout({ color: "#FEE500" }),
      ...border({ width: 0, radius: 14 }),
    },
    LoginNaverButton: {
      ...layout({ color: "#03A94D" }),
      ...border({ width: 0, radius: 14 }),
    },
    LoginProviderButtonText: {
      ...font({
        color: colors.COMMON[0],
        size: 14,
      }),
    },
    LoginAppleButton: {
      ...layout({ color: colors.COMMON[100] }),
      ...border({ width: 1, color: colors.COMMON[0], radius: 14 }),
    },
    LoginAppleButtonImage: {
      ...size<ImageStyle>({ width: 20, height: 20 }),
    },
    LoginAppleButtonText: {
      ...font({
        color: colors.COMMON[0],
        size: 14,
      }),
    },
    LoginBrandedButtonPendingText: {
      ...font({
        color: colors.COMMON[100],
        size: 14,
      }),
    },
    LoginBrandedButtonImage: {
      width: "100%",
      height: "100%",
    },
  });
}
