import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { StartImage } from "@/assets";
import {
  NotificationConfirmModal,
  StartAction,
  StartDescription,
} from "@/components/Screen";
import {
  useBaseStyle,
  useModal,
  useSafeAreaInsets,
  useWindowDimensions,
} from "@/hooks";
import { checkNotificationPermission } from "@/hooks/notification";
import { useAuthStore } from "@/stores";

export default function StartScreen() {
  const { padding, flex } = useBaseStyle();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const router = useRouter();
  const { setOnboarding } = useAuthStore();
  const { isConfirm, onConfirm } = useModal();

  const handleStart = async () => {
    const permissionStatus = await checkNotificationPermission();

    if (permissionStatus === "granted") {
      await setOnboarding({ hasAgreedToTerms: true });
      router.push("/(auth)/onboard");
    } else {
      onConfirm(true);
    }
  };

  return (
    <View
      style={{
        ...flex({ justify: "center", align: "center", flex: 1 }),
        ...padding({ top: 40, bottom: bottom + 28 }),
      }}
    >
      <Image
        source={StartImage}
        contentFit="contain"
        style={{
          width,
          height: (width * 470) / 360,
        }}
      />

      <StartDescription />

      <StartAction onPress={handleStart} />

      <NotificationConfirmModal isConfirm={isConfirm} onConfirm={onConfirm} />
    </View>
  );
}
