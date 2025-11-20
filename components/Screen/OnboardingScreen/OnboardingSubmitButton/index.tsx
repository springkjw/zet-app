/**
 * @description 온보딩 제출 버튼 컴포넌트
 * @author 권재원
 * @since 2025-11-07
 */
import { useMemo } from "react";
import { View, ViewStyle } from "react-native";

import { colors } from "@/assets";
import { BaseButton } from "@/components/Button";
import { useBaseStyle } from "@/hooks";

import type IOnboardingSubmitButtonProps from "./type";

export default function OnboardingSubmitButton({
  step,
  onPress,
  disabled,
}: IOnboardingSubmitButtonProps) {
  const { flex, size, padding, width, font } = useBaseStyle();

  const buttonLabel = useMemo(() => {
    if (step === "shop") {
      return "계속하기";
    }
    return "다음";
  }, [step]);

  return (
    <View
      style={[
        size<ViewStyle>({ height: 80 }),
        flex<ViewStyle>({ align: "center", justify: "center" }),
        padding<ViewStyle>({ vertical: 12 }),
      ]}
    >
      <BaseButton
        label={buttonLabel}
        onPress={onPress}
        disabled={disabled}
        labelStyle={font({ size: 16, weight: 700, color: colors.COMMON[100] })}
        style={size<ViewStyle>({ width: width - 36 })}
      />
    </View>
  );
}
