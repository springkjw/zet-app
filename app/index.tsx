import { Redirect } from "expo-router";
import { View } from "react-native";

import { colors } from "@/assets";
import { HomeFilter, HomeList, HomeNav } from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function HomeScreen() {
  const { size, layout } = useBaseStyle();
  const { isAuthenticated, isGuest, isLoading, onboarding } = useAuthStore();

  if (isLoading) {
    return <View />;
  }

  if (!onboarding.hasAgreedToTerms) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!onboarding.hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboard" />;
  }

  if (!isAuthenticated && !isGuest) {
    return <Redirect href="/(auth)/login" />;
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
