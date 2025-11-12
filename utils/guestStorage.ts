import type { IGuestProfile } from "@/types";
import { asyncStorage, type IStorageAdapter } from "./asyncStorage";

const GUEST_PROFILE_KEY = "guest_profile";

const guestProfileAdapter: IStorageAdapter<IGuestProfile> = {
  key: GUEST_PROFILE_KEY,
  parse: (value: string) => JSON.parse(value),
  stringify: (value: IGuestProfile) => JSON.stringify(value),
};

export const guestStorage = {
  async save(profile: IGuestProfile): Promise<void> {
    return asyncStorage.set(guestProfileAdapter, profile);
  },

  async get(): Promise<IGuestProfile | null> {
    return asyncStorage.get(guestProfileAdapter);
  },

  async clear(): Promise<void> {
    return asyncStorage.remove(GUEST_PROFILE_KEY);
  },

  async has(): Promise<boolean> {
    return asyncStorage.has(GUEST_PROFILE_KEY);
  },
};
