/**
 * 설정 메뉴 컴포넌트
 */
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import { ChevronRightIcon, colors } from "@/assets";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type ISettingMenuProps from "./type";

export default function SettingMenu({
  label,
  direction,
  hasBorder = false,
  onPress,
}: ISettingMenuProps) {
  const style = useStyle();

  const directionStyle = useMemo(() => {
    switch (direction) {
      case "top":
        return style.SettingMenuContainerTop;
      case "bottom":
        return style.SettingMenuContainerBottom;
      default:
        return {};
    }
  }, [direction, style]);

  return (
    <View style={[style.SettingMenuContainer, directionStyle]}>
      <TouchableOpacity style={style.SettingMenuButton} onPress={onPress}>
        <BaseText style={style.SettingMenuButtonLabel}>{label}</BaseText>
        <ChevronRightIcon size={18} color={colors.GRAY[500]} />
      </TouchableOpacity>

      {hasBorder && <View style={style.SettingMenuContainerBorder} />}
    </View>
  );
}
