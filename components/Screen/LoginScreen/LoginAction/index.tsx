import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { AppleImage, colors } from "@/assets";
import { BaseButton } from "@/components/Button";
import { BaseText } from "@/components/Text";
import { useAuthStore } from "@/stores";
import useStyle from "./style";

export default function LoginAction() {
  const router = useRouter();
  const { loginAsGuest } = useAuthStore();
  const style = useStyle();

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push("/(auth)/start");
  };

  const handleSocialLogin = (provider: "google" | "apple" | "kakao") => {
    console.log(`${provider} login - 추후 구현`);
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
          >
            <Image source={AppleImage} style={style.LoginAppleButtonImage} />
            <BaseText weight="semibold" style={style.LoginAppleButtonText}>
              Apple로 로그인
            </BaseText>
          </BaseButton>
        </View>
      </View>
    </View>
  );
}
