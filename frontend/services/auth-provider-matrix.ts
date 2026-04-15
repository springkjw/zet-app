export const SOCIAL_PROVIDERS = ["kakao", "naver", "apple"] as const;
export const LOGIN_CREDENTIAL_TYPES = ["access_token", "id_token"] as const;
export const MOBILE_AUTH_PLATFORMS = ["ios", "android"] as const;
const APPLE_AUTH_PLATFORMS = ["ios"] as const;

export type TSocialProvider = (typeof SOCIAL_PROVIDERS)[number];
export type TLoginCredentialType = (typeof LOGIN_CREDENTIAL_TYPES)[number];
export type TMobileAuthPlatform = (typeof MOBILE_AUTH_PLATFORMS)[number];

export const LOGIN_PROVIDER_MATRIX = {
  kakao: {
    credentialType: "access_token",
    supportedPlatforms: MOBILE_AUTH_PLATFORMS,
  },
  naver: {
    credentialType: "access_token",
    supportedPlatforms: MOBILE_AUTH_PLATFORMS,
  },
  apple: {
    credentialType: "id_token",
    supportedPlatforms: APPLE_AUTH_PLATFORMS,
  },
} as const satisfies Record<
  TSocialProvider,
  {
    credentialType: TLoginCredentialType;
    supportedPlatforms: readonly TMobileAuthPlatform[];
  }
>;

export interface ILoginRequestPayload {
  provider: TSocialProvider;
  credentialType: TLoginCredentialType;
  credential: string;
  platform: TMobileAuthPlatform;
}

export const getLoginCredentialType = (
  provider: TSocialProvider
): TLoginCredentialType => LOGIN_PROVIDER_MATRIX[provider].credentialType;

export const createLoginRequestPayload = ({
  provider,
  credential,
  platform,
}: {
  provider: TSocialProvider;
  credential: string;
  platform: TMobileAuthPlatform;
}): ILoginRequestPayload => ({
  provider,
  credentialType: getLoginCredentialType(provider),
  credential,
  platform,
});
