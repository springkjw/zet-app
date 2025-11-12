import { create } from "zustand";

interface ShopStore {
  onboarding: {
    selectedShopIds: string[];
  };

  toggleOnboardingShop: (shopId: string) => void;
  setOnboardingShops: (shopIds: string[]) => void;
  clearOnboardingShops: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  onboarding: {
    selectedShopIds: [],
  },

  toggleOnboardingShop: (shopId) =>
    set((state) => ({
      onboarding: {
        selectedShopIds: state.onboarding.selectedShopIds.includes(shopId)
          ? state.onboarding.selectedShopIds.filter((id) => id !== shopId)
          : [...state.onboarding.selectedShopIds, shopId],
      },
    })),

  setOnboardingShops: (shopIds) =>
    set({
      onboarding: { selectedShopIds: shopIds },
    }),

  clearOnboardingShops: () =>
    set({
      onboarding: { selectedShopIds: [] },
    }),
}));
