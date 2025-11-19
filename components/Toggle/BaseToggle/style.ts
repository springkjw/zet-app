import { StyleSheet, ViewStyle } from "react-native";
import { useMemo } from "react";
import { colors } from "@/assets/style";
import { useBaseStyle } from "@/hooks/style";
import { IBaseToggleStyle, TToggleSize } from "./type";

const SIZE_CONFIG: Record<
  TToggleSize,
  {
    width: number;
    height: number;
    thumbSize: number;
    borderRadius: number;
  }
> = {
  small: { width: 40, height: 24, thumbSize: 20, borderRadius: 12 },
  medium: { width: 52, height: 32, thumbSize: 28, borderRadius: 16 },
  large: { width: 64, height: 40, thumbSize: 36, borderRadius: 20 },
};

export default function useStyle({
  value,
  disabled,
  size,
  pressed,
}: IBaseToggleStyle) {
  const { flex, size: sizeUtil, border } = useBaseStyle();

  const config = SIZE_CONFIG[size];

  const backgroundColor = useMemo(() => {
    if (disabled) {
      return colors.GRAY[800];
    }

    if (value) {
      return pressed ? colors.GRAY[500] : colors.GRAY[600];
    } else {
      return pressed ? colors.GRAY[600] : colors.GRAY[700];
    }
  }, [value, disabled, pressed]);

  const thumbColor = useMemo(() => {
    if (disabled) {
      return colors.GRAY[600];
    }

    return value ? colors.COMMON[100] : colors.GRAY[400];
  }, [value, disabled]);

  const thumbTravel = config.width - config.thumbSize - 4;

  return {
    styles: StyleSheet.create({
      Container: {
        ...sizeUtil<ViewStyle>({
          width: config.width,
          height: config.height,
        }),
        ...flex<ViewStyle>({
          direction: "row",
          align: "center",
        }),
        ...border({
          radius: config.borderRadius,
        }),
        paddingHorizontal: 2,
        backgroundColor,
      },
      Thumb: {
        ...sizeUtil<ViewStyle>({
          width: config.thumbSize,
          height: config.thumbSize,
        }),
        ...border({
          radius: config.thumbSize / 2,
        }),
        backgroundColor: thumbColor,
      },
    }),
    thumbTravel,
  };
}
