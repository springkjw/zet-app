import { StyleSheet } from "react-native";

import { CONTENT_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

export default function useStyle() {
  const { padding } = useBaseStyle();

  return StyleSheet.create({
    LogoutModalContainer: {
      ...padding({ vertical: CONTENT_PADDING }),
    },
  });
}
