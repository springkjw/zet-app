import { StyleSheet } from "react-native";

import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { padding } = useBaseStyle();

  return StyleSheet.create({
    ProfileActions: {
      ...padding({ horizontal: 20 }),
    },
  });
}
