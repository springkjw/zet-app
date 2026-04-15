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
  bootstrapAuth: () => Promise<void>;
  loginWithSocial: (
    provider: TSocialProvider,
    user: IUser,
    tokens: IAuthTokens,
    onboarding: IOnboardingState
  ) => Promise<void>;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  restoreAuth: (user: IUser, tokens: IAuthTokens) => void;
  setOnboarding: (state: Partial<IOnboardingState>) => void;
  restoreOnboarding: (state: IOnboardingState) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  onboarding: {
    hasAgreedToTerms: false,
    hasCompletedOnboarding: false,
  },

  bootstrapAuth: async () => {
    const { user, tokens } = await storage.restoreAuthSession();

    if (user && tokens) {
      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });
      return;
    }

    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  loginWithSocial: async (_provider, user, tokens, onboarding) => {
    await storage.saveUser(user);
    await storage.saveTokens(tokens);
    await storage.saveOnboarding(onboarding);
    set({
      user,
      tokens,
      isAuthenticated: true,
      isLoading: false,
      onboarding,
    });
  },

  logout: async () => {
    await storage.clearAuth();
    await storage.clearOnboarding();
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      onboarding: {
        hasAgreedToTerms: false,
        hasCompletedOnboarding: false,
      },
    });
  },

  setLoading: (isLoading) => set({ isLoading }),

  restoreAuth: (user, tokens) =>
    set({
      user,
      tokens,
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
