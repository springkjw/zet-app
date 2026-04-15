import { Redirect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, ViewStyle } from "react-native";
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
  const { isAuthenticated, isLoading, onboarding, setOnboarding } = useAuthStore();
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
    updateProfile,
    setOnboarding,
    clearOnboardingShops,
    router,
  ]);

  if (isLoading) {
    return <View />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!onboarding.hasAgreedToTerms) {
    return <Redirect href="/(auth)/start" />;
  }

  if (onboarding.hasCompletedOnboarding) {
    return <Redirect href="/" />;
  }

  return (
    <View style={flex<ViewStyle>({ flex: 1 })}>
      <View
        style={[
          padding<ViewStyle>({ top: insets.top, horizontal: 20 }),
          size<ViewStyle>({ width: "100%", height: 40 + insets.top }),
          flex<ViewStyle>({ align: "flex-start", justify: "flex-start" }),
        ]}
      >
        <OnboardingStepText step={step} />
      </View>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={80 + 12 + insets.bottom}
      >
        <View style={flex<ViewStyle>({ flex: 1 })} />
        <View style={flex<ViewStyle>({ flex: 10 })}>
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
