import { useRouter } from "expo-router";
import { View } from "react-native";

import { BaseButton } from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function OnboardScreen() {
  const { layout } = useBaseStyle();
  const router = useRouter();
  const { setOnboarding } = useAuthStore();

  const handleComplete = async () => {
    await setOnboarding({ hasCompletedOnboarding: true });
    router.replace("/");
  };

  return (
    <View>
      <BaseButton label="온보딩 완료" onPress={handleComplete} />
    </View>
  );
}
