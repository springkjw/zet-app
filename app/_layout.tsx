import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

import { colors } from "@/assets";
import { API_CONFIG } from "@/services/config";
import { useAuthStore } from "@/stores";
import { storage } from "@/utils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

async function initializeMocks() {
  if (!API_CONFIG.ENABLE_MOCKS) {
    return;
  }

  if (__DEV__) {
    await import("@/services/mocks/polyfills");
    const { server } = await import("@/services/mocks/server");

    server.listen({
      onUnhandledRequest: "warn",
    });

    console.log("[MSW] Mocking enabled ✅");
  }
}

export default function RootLayout() {
  const { restoreAuth, restoreOnboarding, setLoading } = useAuthStore();
  const [mockingInitialized, setMockingInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeMocks();
      setMockingInitialized(true);

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

    initialize();
  }, [restoreAuth, restoreOnboarding, setLoading]);

  if (API_CONFIG.ENABLE_MOCKS && !mockingInitialized) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
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
        </KeyboardProvider>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
