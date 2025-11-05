import { useRouter } from "expo-router";
import { View } from "react-native";

import { BaseButton, OnboardingNicknameForm } from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function OnboardScreen() {
  const { layout, flex, size, padding, width, insets } = useBaseStyle();
  const router = useRouter();
  const { setOnboarding } = useAuthStore();

  const handleComplete = async () => {
    await setOnboarding({ hasCompletedOnboarding: true });
    router.replace("/");
  };

  return (
    <View style={{ ...flex({ flex: 1 }) }}>
      <View style={{ ...flex({ flex: 1 }) }}>
        <OnboardingNicknameForm />
      </View>
      <View
        style={{
          ...size({ height: 80 + insets.bottom }),
          ...flex({ align: "center", justify: "center" }),
          ...padding({ bottom: insets.bottom }),
        }}
      >
        <BaseButton
          label="다음"
          onPress={handleComplete}
          style={{ ...size({ width: width - 36 }) }}
        />
      </View>
    </View>
  );
}
