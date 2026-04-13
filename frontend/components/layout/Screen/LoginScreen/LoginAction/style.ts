import { StyleSheet, ImageStyle } from "react-native";

import { colors } from "@/assets";
import { useBaseStyle, useWindowDimensions } from "@/hooks";

export default function useStyle() {
  const { font, layout, flex, size, padding, border } = useBaseStyle();
  const { width } = useWindowDimensions();

  return StyleSheet.create({
    LoginContainer: {
      ...size({ height: 234 }),
      ...padding({ horizontal: 20, top: 40, bottom: 16 }),
    },
    LoginTitle: {
      ...flex({ justify: "center", align: "center" }),
    },
    LoginActionContainer: {
      ...flex({ flex: 1 }),
    },
    LoginGuestContainer: {
      ...size({ height: 42 }),
      ...flex({ justify: "center", align: "center" }),
    },
    LoginGuestText: {
      ...font({
        color: colors.GRAY[500],
        size: 12,
        decoration: "underline",
      }),
    },
    LoginButtonContainer: {
      ...flex({
        direction: "column",
        justify: "center",
        align: "center",
        gap: 8,
      }),
    },
    LoginAppleButton: {
      ...size({ width: width - 40 }),
      ...layout({ color: colors.COMMON[100] }),
      ...border({ width: 1, color: colors.COMMON[0] }),
      ...flex({
        direction: "row",
        justify: "center",
        align: "center",
        gap: 8,
      }),
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
  });
}
