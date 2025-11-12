export type {
  TSocialProvider,
  IUser,
  IAuthTokens,
  IOnboardingState,
} from "../services/api/schemas/auth.schema";

export interface IAuthState {
  user: IUser | null;
  tokens: IAuthTokens | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboarding: IOnboardingState;
}

export interface IGuestProfile {
  nickname: string;
  preferredShopIds: string[];
}
