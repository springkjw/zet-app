import { Image } from "expo-image";
import { View } from "react-native";

import { LoginImage } from "@/assets";
import { LoginAction } from "@/components";
import { useBaseStyle, useWindowDimensions } from "@/hooks";

export default function LoginScreen() {
  const { layout } = useBaseStyle();
  const { width, height } = useWindowDimensions();

  return (
    <View>
      <Image
        source={LoginImage}
        style={{ width, height: (height * 500) / 734 }}
      />
      <LoginAction />
    </View>
  );
}
