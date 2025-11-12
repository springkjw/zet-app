/**
 * @description 온보딩 닉네임 폼 컴포넌트
 * @author 권재원
 * @since 2025-11-07
 */
import { useCallback, useMemo, useState } from "react";
import { TextInput, View } from "react-native";

import { BaseText } from "@/components/Text";
import useStyle from "./style";
import type { IOnboardingNicknameFormProps } from "./type";

export default function OnboardingNicknameForm({
  value,
  onChange,
}: IOnboardingNicknameFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validateNickname = useCallback((value: string): boolean => {
    if (!value || value.length === 0) {
      setErrorMessage("닉네임을 입력해주세요.");
      return false;
    }

    const validPattern = /^[가-힣a-zA-Z0-9]*$/;
    const jamoPattern = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
    const emojiPattern =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

    if (!validPattern.test(value) || emojiPattern.test(value) || jamoPattern.test(value)) {
      setErrorMessage("완성된 한글, 영문, 숫자만 입력할 수 있어요.");
      return false;
    }

    setErrorMessage(undefined);
    return true;
  }, []);

  const handleChange = useCallback(
    (newValue: string) => {
      const isValid = validateNickname(newValue);
      onChange(newValue, isValid);
    },
    [onChange, validateNickname]
  );

  const hasError = useMemo(() => !!errorMessage, [errorMessage]);
  const style = useStyle({ hasError });

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
                value={value}
                onChangeText={handleChange}
                placeholder=""
              />
            </View>
            <BaseText style={style.OnboardingNicknameFormLabel}>님,</BaseText>
          </View>
          {hasError ? (
            <BaseText style={style.OnboardingNicknameFormErrorText}>
              {errorMessage}
            </BaseText>
          ) : (
            <BaseText style={style.OnboardingNicknameFormCountText}>
              {value.length}/10
            </BaseText>
          )}
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
