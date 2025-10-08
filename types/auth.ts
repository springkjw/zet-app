export type TSocialProvider = "google" | "apple" | "kakao" | "naver";

export interface IUser {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
  provider?: TSocialProvider;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface IOnboardingState {
  hasAgreedToTerms: boolean;
  hasCompletedOnboarding: boolean;
}

export interface IAuthState {
  user: IUser | null;
  tokens: IAuthTokens | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboarding: IOnboardingState;
}
