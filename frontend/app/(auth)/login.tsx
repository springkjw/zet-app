import { Image } from "expo-image";
import { View } from "react-native";

import { LoginImage } from "@/assets";
import { LoginAction } from "@/components";
import { AUTH_LOGIN_SCREEN_ROOT_TEST_ID } from "@/e2e/maestro/shared/selectors";
import { useBaseStyle, useWindowDimensions } from "@/hooks";

export default function LoginScreen() {
  useBaseStyle();
  const { width, height } = useWindowDimensions();

  return (
    <View testID={AUTH_LOGIN_SCREEN_ROOT_TEST_ID}>
      <Image
        source={LoginImage}
        style={{ width, height: (height * 500) / 734 }}
      />
      <LoginAction />
    </View>
  );
}
