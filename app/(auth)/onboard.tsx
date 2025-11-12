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
  OnboardingStepText,
  OnboardingSubmitButton,
} from "@/components";
import { useBaseStyle } from "@/hooks";
import { useUpdatePreferredShops } from "@/services";
import { useAuthStore, useShopStore } from "@/stores";

import type { TOnboardingStep } from "@/types";

export default function OnboardScreen() {
  const { flex, insets, size, padding } = useBaseStyle();
  const router = useRouter();
  const { setOnboarding } = useAuthStore();
  const selectedShopIds = useShopStore(
    (state) => state.onboarding.selectedShopIds
  );
  const clearOnboardingShops = useShopStore(
    (state) => state.clearOnboardingShops
  );

  const { mutate: updatePreferredShops, isPending } = useUpdatePreferredShops();

  const [step, setStep] = useState<TOnboardingStep>("nickname");
  const [nickname, setNickname] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleNicknameChange = useCallback(
    (value: string, isValid: boolean) => {
      setNickname(value);
      setHasError(!isValid);
    },
    []
  );

  const handleNext = useCallback(async () => {
    if (step === "nickname") {
      if (hasError || nickname.length === 0) {
        return;
      }
      setStep("shop");
    } else if (step === "shop") {
      updatePreferredShops(
        { shopIds: selectedShopIds },
        {
          onSuccess: async () => {
            await setOnboarding({ hasCompletedOnboarding: true });
            clearOnboardingShops();
            router.replace("/");
          },
          onError: (error) => {
            console.error("Failed to update preferred shops:", error);
          },
        }
      );
    }
  }, [
    step,
    nickname,
    hasError,
    selectedShopIds,
    updatePreferredShops,
    setOnboarding,
    clearOnboardingShops,
    router,
  ]);

  return (
    <View style={{ ...flex({ flex: 1 }) }}>
      <View
        style={{
          ...padding({ top: insets.top, horizontal: 20 }),
          ...size({ width: "100%", height: 40 + insets.top }),
          ...flex({ align: "flex-start", justify: "flex-start" }),
        }}
      >
        <OnboardingStepText step={step} />
      </View>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={80 + 12 + insets.bottom}
      >
        <View style={{ ...flex({ flex: 1 }) }} />
        <View style={{ ...flex({ flex: 10 }) }}>
          {step === "nickname" && (
            <OnboardingNicknameForm
              value={nickname}
              onChange={handleNicknameChange}
            />
          )}
          {step === "shop" && <OnboardingShopForm />}
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: -12 - insets.bottom, opened: 0 }}>
        <OnboardingSubmitButton
          step={step}
          onPress={handleNext}
          disabled={
            step === "nickname" ? hasError || nickname.length === 0 : false
          }
        />
      </KeyboardStickyView>
    </View>
  );
}
