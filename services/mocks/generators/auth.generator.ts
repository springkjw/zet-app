import { generateMock } from '@anatine/zod-mock';
import { fakerKO } from '@faker-js/faker';
import {
  UserSchema,
  AuthTokensSchema,
  LoginResponseSchema,
  OnboardingStateSchema,
  RefreshTokenResponseSchema,
  type IUser,
  type IAuthTokens,
  type ILoginResponse,
  type IOnboardingState,
  type IRefreshTokenResponse,
} from '../../api/schemas/auth.schema';

fakerKO.seed(123);

export const generateUser = (): IUser => {
  const mockUser = generateMock(UserSchema, {
    stringMap: {
      email: () => fakerKO.internet.email(),
      name: () => fakerKO.person.fullName(),
      profileImage: () => fakerKO.image.avatar(),
    },
  });

  return mockUser;
};

export const generateAuthTokens = (): IAuthTokens => {
  return {
    accessToken: fakerKO.string.alphanumeric(32),
    refreshToken: fakerKO.string.alphanumeric(32),
  };
};

export const generateOnboardingState = (
  overrides?: Partial<IOnboardingState>
): IOnboardingState => {
  return {
    hasAgreedToTerms: overrides?.hasAgreedToTerms ?? true,
    hasCompletedOnboarding: overrides?.hasCompletedOnboarding ?? false,
  };
};

export const generateLoginResponse = (
  overrides?: Partial<ILoginResponse>
): ILoginResponse => {
  return {
    user: overrides?.user ?? generateUser(),
    tokens: overrides?.tokens ?? generateAuthTokens(),
    onboarding:
      overrides?.onboarding ?? generateOnboardingState({ hasAgreedToTerms: true }),
  };
};

export const generateRefreshTokenResponse = (): IRefreshTokenResponse => {
  return {
    tokens: generateAuthTokens(),
  };
};

export const MOCK_USERS = {
  defaultUser: generateUser(),
  newUser: {
    ...generateUser(),
    name: undefined,
    profileImage: undefined,
  },
  completedOnboardingUser: generateUser(),
};
