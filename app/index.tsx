import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { colors } from "@/assets";
import { HomeFilter, HomeList, HomeNav } from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function HomeScreen() {
  const { size, layout } = useBaseStyle();
  const { isAuthenticated, isGuest, isLoading, onboarding, hasGuestProfile } =
    useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [shouldCheckGuest, setShouldCheckGuest] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      if (isLoading) {
        return;
      }

      if (isGuest && !onboarding.hasCompletedOnboarding) {
        const hasProfile = await hasGuestProfile();
        setShouldCheckGuest(!hasProfile);
      }

      setIsReady(true);
    };

    checkAuthState();
  }, [isLoading, isGuest, onboarding.hasCompletedOnboarding, hasGuestProfile]);

  if (isLoading || !isReady) {
    return <View />;
  }

  if (!onboarding.hasAgreedToTerms) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!isAuthenticated && !isGuest) {
    return <Redirect href="/(auth)/login" />;
  }

  if (isGuest && shouldCheckGuest) {
    return <Redirect href="/(auth)/onboard" />;
  }

  if (!isGuest && !onboarding.hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboard" />;
  }

  return (
    <>
      <HomeNav />
      <HomeFilter />
      <View
        style={{
          ...size({ height: 8 }),
          ...layout({ color: colors.GRAY[900] }),
        }}
      />
      <HomeList />
    </>
  );
}
