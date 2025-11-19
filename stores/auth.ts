import { create } from "zustand";

import { storage, guestStorage } from "@/utils";

import type {
  IAuthState,
  IAuthTokens,
  IGuestProfile,
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
  setGuestProfile: (nickname: string, shopIds: string[]) => Promise<void>;
  getGuestProfile: () => Promise<IGuestProfile | null>;
  clearGuestProfile: () => Promise<void>;
  hasGuestProfile: () => Promise<boolean>;
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
    await storage.saveUser(user);
    await storage.saveTokens(tokens);
    set({
      user,
      tokens,
      isGuest: false,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: async () => {
    await storage.clearAuth();
    await storage.clearOnboarding();
    await guestStorage.clear();
    set({
      user: null,
      tokens: null,
      isGuest: false,
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

  setGuestProfile: async (nickname, shopIds) => {
    await guestStorage.save({ nickname, preferredShopIds: shopIds });
  },

  getGuestProfile: async () => {
    return await guestStorage.get();
  },

  clearGuestProfile: async () => {
    await guestStorage.clear();
  },

  hasGuestProfile: async () => {
    return await guestStorage.has();
  },
}));
