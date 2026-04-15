import NaverLogin from "@react-native-seoul/naver-login";

import {
  createLoginRequestPayload,
  type ILoginRequestPayload,
  type TMobileAuthPlatform,
} from "@/services/auth-provider-matrix";
import { createProviderLoginError } from "@/services/auth/errors";
import { getAuthProviderRuntimeConfig } from "@/services/auth/runtime";

let hasInitializedNaverLogin = false;

const ensureNaverLoginInitialized = (): void => {
  if (hasInitializedNaverLogin) {
    return;
  }

  const {
    redirectScheme,
    naverAppName,
    naverConsumerKey,
    naverConsumerSecret,
  } = getAuthProviderRuntimeConfig();

  if (!naverConsumerKey || !naverConsumerSecret || !naverAppName) {
    throw createProviderLoginError(
      "config",
      "naver",
      new Error("Missing Naver runtime configuration")
    );
  }

  NaverLogin.initialize({
    appName: naverAppName,
    consumerKey: naverConsumerKey,
    consumerSecret: naverConsumerSecret,
    disableNaverAppAuthIOS: false,
    serviceUrlSchemeIOS: redirectScheme,
  });

  hasInitializedNaverLogin = true;
};

export const loginWithNaver = async (
  platform: TMobileAuthPlatform
): Promise<ILoginRequestPayload> => {
  ensureNaverLoginInitialized();

  const response = await NaverLogin.login();

  if (!response.isSuccess || !response.successResponse?.accessToken) {
    throw response.failureResponse ??
      new Error("Naver login completed without access token");
  }

  return createLoginRequestPayload({
    provider: "naver",
    credential: response.successResponse.accessToken,
    platform,
  });
};
