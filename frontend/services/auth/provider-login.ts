import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Platform } from "react-native";

import { useLogin } from "@/services/api/hooks/auth";
import {
  LOGIN_PROVIDER_MATRIX,
  SOCIAL_PROVIDERS,
  type ILoginRequestPayload,
  type TMobileAuthPlatform,
  type TSocialProvider,
} from "@/services/auth-provider-matrix";
import {
  createProviderLoginError,
  normalizeProviderLoginError,
  type IProviderLoginError,
} from "@/services/auth/errors";
import { loginWithApple } from "@/services/auth/providers/apple";
import { loginWithKakao } from "@/services/auth/providers/kakao";
import { loginWithNaver } from "@/services/auth/providers/naver";
import { useAuthStore } from "@/stores";

const createProviderLoginPayload = async (
  provider: TSocialProvider,
  platform: TMobileAuthPlatform
): Promise<ILoginRequestPayload> => {
  switch (provider) {
    case "kakao":
      return loginWithKakao(platform);
    case "naver":
      return loginWithNaver(platform);
    case "apple":
      if (platform !== "ios") {
        throw createProviderLoginError(
          "unsupported_platform",
          "apple",
          new Error("Apple login is only available on iOS")
        );
      }

      return loginWithApple("ios");
  }
};

export const getAvailableLoginProviders = (
  platform: TMobileAuthPlatform
): TSocialProvider[] =>
  SOCIAL_PROVIDERS.filter((provider) => {
    const supportedPlatforms: readonly TMobileAuthPlatform[] =
      LOGIN_PROVIDER_MATRIX[provider].supportedPlatforms;

    return supportedPlatforms.includes(platform);
  });

export const useProviderLogin = () => {
  const router = useRouter();
  const { loginWithSocial } = useAuthStore();
  const { mutateAsync: exchangeCredential, isPending: isBackendPending } =
    useLogin();
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<IProviderLoginError | null>(null);

  const platform: TMobileAuthPlatform =
    Platform.OS === "android" ? "android" : "ios";

  const availableProviders = useMemo(
    () => getAvailableLoginProviders(platform),
    [platform]
  );

  const login = useCallback(
    async (provider: TSocialProvider) => {
      setError(null);
      setIsExecuting(true);

      try {
        const payload = await createProviderLoginPayload(provider, platform);
        const data = await exchangeCredential(payload);

        await loginWithSocial(provider, data.user, data.tokens, data.onboarding);

        if (!data.onboarding.hasAgreedToTerms) {
          router.replace("/(auth)/start");
          return;
        }

        if (!data.onboarding.hasCompletedOnboarding) {
          router.replace("/(auth)/onboard");
          return;
        }

        router.replace("/");
      } catch (caughtError) {
        setError(normalizeProviderLoginError(caughtError, provider));
      } finally {
        setIsExecuting(false);
      }
    },
    [exchangeCredential, loginWithSocial, platform, router]
  );

  return {
    availableProviders,
    error,
    isPending: isExecuting || isBackendPending,
    login,
    platform,
    resetError: () => setError(null),
  };
};
