import { StyleSheet } from "react-native";

import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { flex, size, padding } = useBaseStyle();

  return StyleSheet.create({
    HomeList: {
      ...flex({ flex: 1 }),
      ...size({ width: "100%" }),
      ...padding({ horizontal: 20, vertical: 16 }),
    },
  });
}
