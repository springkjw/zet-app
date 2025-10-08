import { Stack } from "expo-router";

import { colors } from "@/assets";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.GRAY[800],
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="start" />
      <Stack.Screen name="onboard" />
    </Stack>
  );
}
