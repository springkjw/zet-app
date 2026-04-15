export const MAESTRO_APP_ID = "com.geniusproject.zet";

export const AUTH_LOGIN_SCREEN_ROOT_TEST_ID = "auth.login.screen.root";
export const AUTH_LOGIN_ERROR_BANNER_TEST_ID = "auth.login.error.banner";

export type TAuthLoginProviderSelector = "kakao" | "naver" | "apple";

export const getAuthLoginProviderButtonTestId = (
  provider: TAuthLoginProviderSelector
) => `auth.login.provider.${provider}.button`;
