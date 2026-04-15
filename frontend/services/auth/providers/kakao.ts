import { initializeKakaoSDK } from "@react-native-kakao/core";
import { login as loginWithKakaoSdk } from "@react-native-kakao/user";

import {
  createLoginRequestPayload,
  type ILoginRequestPayload,
  type TMobileAuthPlatform,
} from "@/services/auth-provider-matrix";
import { createProviderLoginError } from "@/services/auth/errors";
import { getAuthProviderRuntimeConfig } from "@/services/auth/runtime";

let kakaoSdkInitialization: Promise<void> | null = null;

const ensureKakaoSdkInitialized = async (): Promise<void> => {
  const { kakaoNativeAppKey } = getAuthProviderRuntimeConfig();

  if (!kakaoNativeAppKey) {
    throw createProviderLoginError(
      "config",
      "kakao",
      new Error("Missing Kakao native app key")
    );
  }

  if (!kakaoSdkInitialization) {
    kakaoSdkInitialization = initializeKakaoSDK(kakaoNativeAppKey);
  }

  await kakaoSdkInitialization;
};

export const loginWithKakao = async (
  platform: TMobileAuthPlatform
): Promise<ILoginRequestPayload> => {
  await ensureKakaoSdkInitialized();

  const token = await loginWithKakaoSdk();

  return createLoginRequestPayload({
    provider: "kakao",
    credential: token.accessToken,
    platform,
  });
};
