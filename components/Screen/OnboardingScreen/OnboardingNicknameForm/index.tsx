/**
 * @description 온보딩 닉네임 폼 컴포넌트
 * @author 권재원
 * @since 2025-11-07
 */
import { useState } from "react";
import { TextInput, View } from "react-native";

import { BaseText } from "@/components/Text";
import useStyle from "./style";

export default function OnboardingNicknameForm() {
  const style = useStyle();
  const [nickname, setNickname] = useState("");

  return (
    <View style={style.OnboardingNicknameFormContainer}>
      <View style={style.OnboardingNicknameFormInnerContainer}>
        <View style={style.OnboardingNicknameFormTopContainer}>
          <View style={style.OnboardingNicknameFormTopInnerContainer}>
            <View style={style.OnboardingNicknameFormInputContainer}>
              <TextInput
                style={style.OnboardingNicknameFormInput}
                numberOfLines={1}
                maxLength={10}
                autoFocus={true}
                value={nickname}
                onChangeText={setNickname}
                placeholder=""
              />
            </View>
            <BaseText style={style.OnboardingNicknameFormLabel}>님,</BaseText>
          </View>
          <BaseText style={style.OnboardingNicknameFormCountText}>
            {nickname.length}/10
          </BaseText>
        </View>
        <View>
          <BaseText style={style.OnboardingNicknameFormLabel}>
            몇 가지 더 설정하고{`\n`}함께 최저가 콜라 즐겨요
          </BaseText>
        </View>
      </View>
    </View>
  );
}
