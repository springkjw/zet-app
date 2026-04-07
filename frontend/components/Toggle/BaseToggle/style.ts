import { useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";

import { colors } from "@/assets/style";
import { useBaseStyle } from "@/hooks";

import type { IBaseToggleStyle, TToggleSize } from "./type";

const SIZE_CONFIG: Record<
  TToggleSize,
  {
    width: number;
    height: number;
    thumbSize: number;
    borderRadius: number;
  }
> = {
  small: { width: 40, height: 20, thumbSize: 16, borderRadius: 8 },
  medium: { width: 64, height: 28, thumbSize: 24, borderRadius: 12 },
  large: { width: 80, height: 36, thumbSize: 32, borderRadius: 16 },
};

export default function useStyle({
  value,
  disabled,
  size,
  pressed,
}: IBaseToggleStyle) {
  const { flex, size: sizeUtil, border, padding, layout, shadow } = useBaseStyle();

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

  const thumbTravel = config.width - config.thumbSize * 1.5 - 2 * 2;

  return {
    styles: StyleSheet.create({
      BaseToggleContainer: {
        ...sizeUtil({
          width: config.width,
          height: config.height,
        }),
        ...flex({
          direction: "row",
          align: "flex-start",
          justify: "flex-start",
        }),
        ...border({
          radius: config.borderRadius,
        }),
        ...padding({ horizontal: 2, vertical: 1.5 }),
        ...layout({ color: backgroundColor }),
      },
      BaseToggleThumb: {
        ...sizeUtil({
          width: config.thumbSize * 1.5,
          height: config.thumbSize,
        }),
        ...border({
          radius: config.borderRadius * 0.95,
          width: 0.5,
          color: "rgba(0,0,0,0.1)",
        }),
        ...layout({ color: thumbColor }),
        ...shadow({
          color: "#000",
          offset: { width: 0, height: 1 },
          opacity: 0.15,
          radius: 1.5,
          elevation: 2,
        }),
      },
    }),
    thumbTravel,
  };
}
