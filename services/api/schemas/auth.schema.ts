import { z } from "zod";

export const SocialProviderSchema = z.enum(["kakao", "naver", "apple"]);

export const UserSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(1).max(20),
  provider: SocialProviderSchema,
  preferredShopIds: z.array(z.string().uuid()).optional(),
  createdAt: z.string().datetime(),
});

export const AuthTokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
});

export const OnboardingStateSchema = z.object({
  hasAgreedToTerms: z.boolean(),
  hasCompletedOnboarding: z.boolean(),
});

export const LoginRequestSchema = z.object({
  provider: SocialProviderSchema,
  token: z.string().min(1),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  tokens: AuthTokensSchema,
  onboarding: OnboardingStateSchema,
  isNewUser: z.boolean(),
});

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1),
});

export const RefreshTokenResponseSchema = z.object({
  tokens: AuthTokensSchema,
});

export const UpdatePreferredShopsRequestSchema = z.object({
  shopIds: z.array(z.string().uuid()),
});

export const UpdatePreferredShopsResponseSchema = z.object({
  user: UserSchema,
});

export const UpdateProfileRequestSchema = z.object({
  nickname: z.string().min(1).max(20),
});

export const UpdateProfileResponseSchema = z.object({
  user: UserSchema,
});

export type TSocialProvider = z.infer<typeof SocialProviderSchema>;
export type IUser = z.infer<typeof UserSchema>;
export type IAuthTokens = z.infer<typeof AuthTokensSchema>;
export type IOnboardingState = z.infer<typeof OnboardingStateSchema>;
export type ILoginRequest = z.infer<typeof LoginRequestSchema>;
export type ILoginResponse = z.infer<typeof LoginResponseSchema>;
export type IRefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type IRefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
export type IUpdatePreferredShopsRequest = z.infer<
  typeof UpdatePreferredShopsRequestSchema
>;
export type IUpdatePreferredShopsResponse = z.infer<
  typeof UpdatePreferredShopsResponseSchema
>;
export type IUpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;
export type IUpdateProfileResponse = z.infer<typeof UpdateProfileResponseSchema>;
