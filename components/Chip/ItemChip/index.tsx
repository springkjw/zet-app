import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";

import { colors } from "@/assets";
import { BaseText } from "@/components/Text";
import { ItemChipType } from "@/types";
import useStyle from "./style";

import type IItemChipProps from "./type";

export default function ItemChip({ type, style }: IItemChipProps) {
  const innerStyle = useStyle();

  const label = useMemo(() => {
    switch (type) {
      case ItemChipType.ZET_PICK:
        return "제트픽";
      case ItemChipType.PRICE:
        return "역대 최저가";
      case ItemChipType.LARGE:
        return "대박";
      case ItemChipType.MEDIUM:
        return "중박";
      default:
        return "일반";
    }
  }, [type]);

  const backgroundColors = useMemo(() => {
    switch (type) {
      case ItemChipType.ZET_PICK:
        return ["#F34E4B", "#6573F3"] as const;
      case ItemChipType.PRICE:
        return ["#F34E4B", "#F34E4B"] as const;
      case ItemChipType.LARGE:
        return ["#EB9E09", "#EB9E09"] as const;
      case ItemChipType.MEDIUM:
        return ["#1363AD", "#1363AD"] as const;
      case ItemChipType.DEFAULT:
        return [colors.COMMON[100], colors.COMMON[100]] as const;
      default:
        return [colors.COMMON[100], colors.COMMON[100]] as const;
    }
  }, [type]);

  return (
    <LinearGradient
      colors={backgroundColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[innerStyle.ItemChip, style]}
    >
      <BaseText weight="bold" style={innerStyle.ItemChipText}>
        {label}
      </BaseText>
    </LinearGradient>
  );
}
