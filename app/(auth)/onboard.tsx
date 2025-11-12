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
import { useUpdatePreferredShops, useUpdateProfile } from "@/services";
import { useAuthStore, useShopStore } from "@/stores";

import type { TOnboardingStep } from "@/types";

export default function OnboardScreen() {
  const { flex, insets, size, padding } = useBaseStyle();
  const router = useRouter();
  const { isGuest, setOnboarding, setGuestProfile } = useAuthStore();
  const selectedShopIds = useShopStore(
    (state) => state.onboarding.selectedShopIds
  );
  const clearOnboardingShops = useShopStore(
    (state) => state.clearOnboardingShops
  );

  const { mutate: updatePreferredShops, isPending: isUpdatingShops } =
    useUpdatePreferredShops();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

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

      if (isGuest) {
        await setGuestProfile(nickname, []);
        setStep("shop");
      } else {
        updateProfile(
          { nickname },
          {
            onSuccess: () => {
              setStep("shop");
            },
            onError: (error) => {
              console.error("Failed to update profile:", error);
            },
          }
        );
      }
    } else if (step === "shop") {
      if (isGuest) {
        await setGuestProfile(nickname, selectedShopIds);
        await setOnboarding({ hasCompletedOnboarding: true });
        clearOnboardingShops();
        router.replace("/");
      } else {
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
    }
  }, [
    step,
    nickname,
    hasError,
    selectedShopIds,
    isGuest,
    updatePreferredShops,
    updateProfile,
    setOnboarding,
    setGuestProfile,
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
            step === "nickname"
              ? hasError || nickname.length === 0 || isUpdatingProfile
              : isUpdatingShops
          }
        />
      </KeyboardStickyView>
    </View>
  );
}
