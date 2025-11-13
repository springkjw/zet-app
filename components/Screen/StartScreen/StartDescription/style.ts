import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, padding, margin } = useBaseStyle();

  return StyleSheet.create({
    StartDescriptionContainer: {
      ...flex({ flex: 1 }),
      ...padding({ top: 40 }),
    } as ViewStyle,
    StartDescriptionText: {
      ...margin({ bottom: 24 }),
    } as TextStyle,
  });
}
