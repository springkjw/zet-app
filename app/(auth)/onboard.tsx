import { useRouter } from "expo-router";
import { View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";

import { colors } from "@/assets";
import { BaseButton, OnboardingNicknameForm } from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function OnboardScreen() {
  const { flex, size, padding, width, insets, font } = useBaseStyle();
  const router = useRouter();
  const { setOnboarding } = useAuthStore();

  const handleComplete = async () => {
    await setOnboarding({ hasCompletedOnboarding: true });
    router.replace("/");
  };

  return (
    <View style={{ ...flex({ flex: 1 }) }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={80 + 12 + insets.bottom}
      >
        <View style={{ ...flex({ flex: 1 }) }} />
        <View style={{ ...flex({ flex: 10 }) }}>
          <OnboardingNicknameForm />
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: -12 - insets.bottom, opened: 0 }}>
        <View
          style={{
            ...size({ height: 80 }),
            ...flex({ align: "center", justify: "center" }),
            ...padding({ vertical: 12 }),
          }}
        >
          <BaseButton
            label="다음"
            onPress={handleComplete}
            labelStyle={{
              ...font({ size: 16, weight: 700, color: colors.COMMON[100] }),
            }}
            style={{ ...size({ width: width - 36 }) }}
          />
        </View>
      </KeyboardStickyView>
    </View>
  );
}
