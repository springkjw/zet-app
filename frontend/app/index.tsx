import { Redirect } from "expo-router";
import { View, ViewStyle } from "react-native";

import { colors } from "@/assets";
import { HomeFilter, HomeList, HomeNav } from "@/components";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function HomeScreen() {
  const { size, layout } = useBaseStyle();
  const { isAuthenticated, isLoading, onboarding } = useAuthStore();

  if (isLoading) {
    return <View />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!onboarding.hasAgreedToTerms) {
    return <Redirect href="/(auth)/start" />;
  }

  if (!onboarding.hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboard" />;
  }

  return (
    <>
      <HomeNav />
      <HomeFilter />
      <View
        style={[
          size<ViewStyle>({ height: 8 }),
          layout<ViewStyle>({ color: colors.GRAY[900] }),
        ]}
      />
      <HomeList />
    </>
  );
}
