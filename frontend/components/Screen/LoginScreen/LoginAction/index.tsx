import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { AppleImage, colors } from "@/assets";
import { BaseButton } from "@/components/Button";
import { BaseText } from "@/components/Text";
import { useLogin } from "@/services";
import { useAuthStore } from "@/stores";
import useStyle from "./style";

export default function LoginAction() {
  const router = useRouter();
  const { loginAsGuest, loginWithSocial } = useAuthStore();
  const { mutate: login, isPending } = useLogin();
  const style = useStyle();

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push("/(auth)/start");
  };

  const handleSocialLogin = (provider: "apple" | "kakao" | "naver") => {
    login(
      { provider, token: "mock_token" },
      {
        onSuccess: (data) => {
          loginWithSocial(provider, data.user, data.tokens);
          if (data.isNewUser || !data.onboarding.hasCompletedOnboarding) {
            router.replace("/(auth)/onboard");
          } else {
            router.replace("/");
          }
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  return (
    <View style={style.LoginContainer}>
      <View style={style.LoginTitle}>
        <BaseText size={20} weight="semibold" color={colors.RED[50]}>
          ZET와 함께 최저가 탐색 시작해요
        </BaseText>
      </View>

      <View style={style.LoginActionContainer}>
        <View style={style.LoginGuestContainer}>
          <TouchableOpacity onPress={handleGuestLogin}>
            <BaseText style={style.LoginGuestText}>
              비회원으로 둘러보기
            </BaseText>
          </TouchableOpacity>
        </View>

        <View style={style.LoginButtonContainer}>
          <BaseButton
            style={style.LoginAppleButton}
            height={48}
            onPress={() => handleSocialLogin("apple")}
            disabled={isPending}
          >
            <Image source={AppleImage} style={style.LoginAppleButtonImage} />
            <BaseText weight="semibold" style={style.LoginAppleButtonText}>
              {isPending ? "로그인 중..." : "Apple로 로그인"}
            </BaseText>
          </BaseButton>
        </View>
      </View>
    </View>
  );
}
