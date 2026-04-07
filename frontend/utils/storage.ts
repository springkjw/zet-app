import * as SecureStore from "expo-secure-store";

import type { IAuthTokens, IOnboardingState, IUser } from "@/types";

const KEYS = {
  USER: "user",
  TOKENS: "tokens",
  ONBOARDING: "onboarding",
} as const;

export const storage = {
  async saveUser(user: IUser): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  },

  async getUser(): Promise<IUser | null> {
    try {
      const user = await SecureStore.getItemAsync(KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to get user:", error);
      return null;
    }
  },

  async saveTokens(tokens: IAuthTokens): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEYS.TOKENS, JSON.stringify(tokens));
    } catch (error) {
      console.error("Failed to save tokens:", error);
    }
  },

  async getTokens(): Promise<IAuthTokens | null> {
    try {
      const tokens = await SecureStore.getItemAsync(KEYS.TOKENS);
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error("Failed to get tokens:", error);
      return null;
    }
  },

  async clearAuth(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(KEYS.USER);
      await SecureStore.deleteItemAsync(KEYS.TOKENS);
    } catch (error) {
      console.error("Failed to clear auth:", error);
    }
  },

  async saveOnboarding(state: IOnboardingState): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEYS.ONBOARDING, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save onboarding:", error);
    }
  },

  async getOnboarding(): Promise<IOnboardingState | null> {
    try {
      const onboarding = await SecureStore.getItemAsync(KEYS.ONBOARDING);
      return onboarding ? JSON.parse(onboarding) : null;
    } catch (error) {
      console.error("Failed to get onboarding:", error);
      return null;
    }
  },

  async clearOnboarding(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(KEYS.ONBOARDING);
    } catch (error) {
      console.error("Failed to clear onboarding:", error);
    }
  },
};
