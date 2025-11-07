import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";

import {
  OnboardingNicknameForm,
  OnboardingShopForm,
  OnboardingSubmitButton,
} from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

import type { TOnboardingStep } from "@/types";

export default function OnboardScreen() {
  const { flex, insets } = useBaseStyle();
  const router = useRouter();
  const { setOnboarding } = useAuthStore();

  const [step, setStep] = useState<TOnboardingStep>("nickname");

  const handleNext = useCallback(async () => {
    // if ()
    //   await setOnboarding({ hasCompletedOnboarding: true });
    //   router.replace("/");
    // } else {
    //   setStep(step === "nickname" ? "shop" : "nickname");
    // }
    setStep((prev) => {
      if (prev === "nickname") {
        return "shop";
      }
      return prev;
    });
  }, [step, setOnboarding, router]);

  return (
    <View style={{ ...flex({ flex: 1 }) }}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={80 + 12 + insets.bottom}
      >
        <View style={{ ...flex({ flex: 1 }) }} />
        <View style={{ ...flex({ flex: 10 }) }}>
          {step === "nickname" && <OnboardingNicknameForm />}
          {step === "shop" && <OnboardingShopForm />}
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: -12 - insets.bottom, opened: 0 }}>
        <OnboardingSubmitButton step={step} onPress={handleNext} />
      </KeyboardStickyView>
    </View>
  );
}
