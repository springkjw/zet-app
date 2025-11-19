import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { colors } from "@/assets/style";
import useStyle from "./style";
import IBaseToggleProps from "./type";

export default function BaseToggle({
  value,
  onValueChange,
  disabled = false,
  size = "medium",
  style,
}: IBaseToggleProps) {
  const [pressed, setPressed] = useState(false);

  const { styles, thumbTravel } = useStyle({
    value,
    disabled,
    size,
    pressed,
  });

  const animatedValue = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    animatedValue.value = withTiming(value ? 1 : 0, { duration: 300 });
  }, [value]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animatedValue.value * thumbTravel,
        },
      ],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 1],
      disabled
        ? [colors.GRAY[800], colors.GRAY[800]]
        : [colors.GRAY[700], colors.GRAY[600]]
    );

    return { backgroundColor };
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => !disabled && setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Animated.View style={[styles.Container, backgroundAnimatedStyle, style]}>
        <Animated.View style={[styles.Thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
}
