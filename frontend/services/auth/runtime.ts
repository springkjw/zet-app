import Constants from "expo-constants";

interface IExpoAuthProviderExtra {
  redirectScheme?: string;
  kakao?: {
    nativeAppKeyPlaceholder?: string;
  };
  naver?: {
    appNamePlaceholder?: string;
  };
}

export interface IAuthProviderRuntimeConfig {
  redirectScheme: string;
  kakaoNativeAppKey: string;
  naverConsumerKey: string;
  naverConsumerSecret: string;
  naverAppName: string;
  appleServiceId: string;
}

const getExpoAuthProviderExtra = (): IExpoAuthProviderExtra => {
  const expoConfig = Constants.expoConfig;

  return (expoConfig?.extra?.authProviders ?? {}) as IExpoAuthProviderExtra;
};

export const getAuthProviderRuntimeConfig = (): IAuthProviderRuntimeConfig => {
  const authProviders = getExpoAuthProviderExtra();

  return {
    redirectScheme:
      process.env.EXPO_PUBLIC_AUTH_REDIRECT_SCHEME ??
      authProviders.redirectScheme ??
      "zet",
    kakaoNativeAppKey:
      process.env.EXPO_PUBLIC_AUTH_KAKAO_NATIVE_APP_KEY ??
      authProviders.kakao?.nativeAppKeyPlaceholder ??
      "",
    naverConsumerKey: process.env.EXPO_PUBLIC_AUTH_NAVER_CONSUMER_KEY ?? "",
    naverConsumerSecret:
      process.env.EXPO_PUBLIC_AUTH_NAVER_CONSUMER_SECRET ?? "",
    naverAppName:
      process.env.EXPO_PUBLIC_AUTH_NAVER_APP_NAME ??
      authProviders.naver?.appNamePlaceholder ??
      "zet",
    appleServiceId: process.env.EXPO_PUBLIC_AUTH_APPLE_SERVICE_ID ?? "",
  };
};
