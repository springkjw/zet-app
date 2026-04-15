import { useState } from "react";
import { Pressable } from "react-native";

import { BaseText } from "@/components";
import { useStyle, useTextStyle } from "./style";

import type { IBaseButtonProps } from "./type";

export default function BaseButton({
  label,
  height,
  radius,
  disabled = false,
  testID,
  variant = "primary",
  size = "large",
  onPress,
  style,
  labelStyle,
  children,
}: IBaseButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);

  const innerStyle = useStyle({
    height,
    radius,
    variant,
    size,
    disabled,
    pressed,
  });

  const textStyle = useTextStyle({ variant, disabled });

  return (
    <Pressable
      style={[innerStyle.BaseButton, style]}
      disabled={disabled}
      testID={testID}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      {label && (
        <BaseText weight="semibold" color={textStyle.color} style={labelStyle}>
          {label}
        </BaseText>
      )}
      {children}
    </Pressable>
  );
}
