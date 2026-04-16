import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

import {
  AppleImage,
  KakaoLoginButtonImage,
  NaverLoginButtonDarkImage,
  colors,
} from "@/assets";
import { BaseButton, BaseText } from "@/components";
import {
  AUTH_LOGIN_ERROR_BANNER_TEST_ID,
  getAuthLoginProviderButtonTestId,
} from "@/e2e/maestro/shared/selectors";
import { useProviderLogin } from "@/services/auth";
import type { TSocialProvider } from "@/types";
import useStyle from "./style";

const LOGIN_PROVIDER_LABELS: Record<TSocialProvider, string> = {
  kakao: "카카오로 로그인",
  naver: "네이버로 로그인",
  apple: "Apple로 로그인",
};

const MIN_BRANDED_PENDING_VISIBLE_MS = 700;

export default function LoginAction() {
  const { availableProviders, error, isPending, login } = useProviderLogin();
  const style = useStyle();
  const pendingLabel = "로그인 중...";
  const [pendingBrandedProvider, setPendingBrandedProvider] = useState<TSocialProvider | null>(null);
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!pendingBrandedProvider) {
      return;
    }

    if (isPending) {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }

      return;
    }

    const startedAt = pendingStartedAtRef.current ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const delay = Math.max(MIN_BRANDED_PENDING_VISIBLE_MS - elapsed, 0);

    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
    }

    pendingTimeoutRef.current = setTimeout(() => {
      pendingTimeoutRef.current = null;
      pendingStartedAtRef.current = null;
      setPendingBrandedProvider(null);
    }, delay);
  }, [isPending, pendingBrandedProvider]);

  const handleLoginPress = (provider: TSocialProvider) => {
    if (provider === "kakao" || provider === "naver") {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }

      pendingStartedAtRef.current = Date.now();
      setPendingBrandedProvider(provider);
    }

    login(provider);
  };

  return (
    <View style={style.LoginContainer}>
      <View style={style.LoginTitle}>
        <BaseText size={20} weight="semibold" color={colors.RED[50]}>
          ZET와 함께 최저가 탐색 시작해요
        </BaseText>
      </View>

      <View style={style.LoginActionContainer}>
        <View style={style.LoginButtonContainer}>
          {error && (
            <View
              style={style.LoginErrorBanner}
              testID={AUTH_LOGIN_ERROR_BANNER_TEST_ID}
            >
              <BaseText size={12} weight="medium" style={style.LoginErrorText}>
                {error.message}
              </BaseText>
            </View>
          )}

          {availableProviders.map((provider) => {
            const isApple = provider === "apple";
            const isKakao = provider === "kakao";
            const isNaver = provider === "naver";
            const isBrandedSocialButton = isKakao || isNaver;
            const isBrandedPendingVisible = isBrandedSocialButton
              ? pendingBrandedProvider === provider
              : isPending;

            return (
              <BaseButton
                key={provider}
                style={[
                  style.LoginProviderButton,
                  isKakao && style.LoginKakaoButton,
                  isNaver && style.LoginNaverButton,
                  isApple && style.LoginAppleButton,
                ]}
                height={48}
                onPress={() => handleLoginPress(provider)}
                disabled={isPending}
                testID={getAuthLoginProviderButtonTestId(provider)}
              >
                {isBrandedPendingVisible || isPending ? (
                  <BaseText
                    weight="semibold"
                    style={[
                      style.LoginProviderButtonText,
                      isApple && style.LoginAppleButtonText,
                      isBrandedSocialButton && style.LoginBrandedButtonPendingText,
                    ]}
                  >
                    {pendingLabel}
                  </BaseText>
                ) : isApple ? (
                  <>
                    <Image
                      source={AppleImage}
                      style={style.LoginAppleButtonImage}
                    />
                    <BaseText
                      weight="semibold"
                      style={style.LoginAppleButtonText}
                    >
                      {LOGIN_PROVIDER_LABELS.apple}
                    </BaseText>
                  </>
                ) : isBrandedSocialButton ? (
                  <Image
                    source={isKakao ? KakaoLoginButtonImage : NaverLoginButtonDarkImage}
                    style={style.LoginBrandedButtonImage}
                    contentFit="contain"
                  />
                ) : (
                  <BaseText
                    weight="semibold"
                    style={[
                      style.LoginProviderButtonText,
                      isApple && style.LoginAppleButtonText,
                    ]}
                  >
                    {LOGIN_PROVIDER_LABELS[provider]}
                  </BaseText>
                )}
              </BaseButton>
            );
          })}
        </View>
      </View>
    </View>
  );
}
