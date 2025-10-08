import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { colors } from "@/assets";
import { useAuthStore } from "@/stores";
import { storage } from "@/utils";

export default function RootLayout() {
  const { restoreAuth, restoreOnboarding, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const [user, tokens, onboarding] = await Promise.all([
          storage.getUser(),
          storage.getTokens(),
          storage.getOnboarding(),
        ]);

        if (user && tokens) {
          restoreAuth(user, tokens);
        } else {
          setLoading(false);
        }

        if (onboarding) {
          restoreOnboarding(onboarding);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setLoading(false);
      }
    };

    initAuth();
  }, [restoreAuth, restoreOnboarding, setLoading]);

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.GRAY[800],
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
