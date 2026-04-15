import { Image } from "expo-image";
import { View } from "react-native";

import { AppleImage, colors } from "@/assets";
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

export default function LoginAction() {
  const { availableProviders, error, isPending, login } = useProviderLogin();
  const style = useStyle();

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

            return (
              <BaseButton
                key={provider}
                style={[
                  style.LoginProviderButton,
                  isApple && style.LoginAppleButton,
                ]}
                height={48}
                onPress={() => login(provider)}
                disabled={isPending}
                testID={getAuthLoginProviderButtonTestId(provider)}
              >
                {isApple && (
                  <Image
                    source={AppleImage}
                    style={style.LoginAppleButtonImage}
                  />
                )}
                <BaseText
                  weight="semibold"
                  style={[
                    style.LoginProviderButtonText,
                    isApple && style.LoginAppleButtonText,
                  ]}
                >
                  {isPending ? "로그인 중..." : LOGIN_PROVIDER_LABELS[provider]}
                </BaseText>
              </BaseButton>
            );
          })}
        </View>
      </View>
    </View>
  );
}
