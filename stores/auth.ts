import { create } from "zustand";

import { storage } from "@/utils";

import type {
  IAuthState,
  IAuthTokens,
  IOnboardingState,
  IUser,
  TSocialProvider,
} from "@/types";

interface IAuthStore extends IAuthState {
  loginAsGuest: () => void;
  loginWithSocial: (
    provider: TSocialProvider,
    user: IUser,
    tokens: IAuthTokens
  ) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  restoreAuth: (user: IUser, tokens: IAuthTokens) => void;
  setOnboarding: (state: Partial<IOnboardingState>) => void;
  restoreOnboarding: (state: IOnboardingState) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  tokens: null,
  isGuest: false,
  isAuthenticated: false,
  isLoading: true,
  onboarding: {
    hasAgreedToTerms: false,
    hasCompletedOnboarding: false,
  },

  loginAsGuest: () =>
    set({
      isGuest: true,
      isAuthenticated: false,
      user: null,
      tokens: null,
      isLoading: false,
    }),

  loginWithSocial: async (provider, user, tokens) => {
    const userWithProvider = { ...user, provider };
    await storage.saveUser(userWithProvider);
    await storage.saveTokens(tokens);
    set({
      user: userWithProvider,
      tokens,
      isGuest: false,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: async () => {
    await storage.clearAuth();
    set({
      user: null,
      tokens: null,
      isGuest: false,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),

  restoreAuth: (user, tokens) =>
    set({
      user,
      tokens,
      isGuest: false,
      isAuthenticated: true,
      isLoading: false,
    }),

  setOnboarding: async (state) => {
    set((prev) => {
      const newOnboarding = { ...prev.onboarding, ...state };
      storage.saveOnboarding(newOnboarding);
      return { onboarding: newOnboarding };
    });
  },

  restoreOnboarding: (state) =>
    set({
      onboarding: state,
    }),
}));
