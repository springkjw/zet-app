import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { colors } from "@/assets";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.GRAY[800],
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
