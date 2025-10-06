import { View } from "react-native";

import { LoginAction } from "@/components";
import { useBaseStyle } from "@/hooks";

export default function LoginScreen() {
  const { layout } = useBaseStyle();

  return (
    <View>
      <LoginAction />
    </View>
  );
}
