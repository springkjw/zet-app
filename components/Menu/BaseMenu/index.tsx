import { TouchableOpacity, View } from "react-native";

import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type IBaseMenuProps from "./type";

export default function BaseMenu({
  label,
  children,
  isTop = false,
  isBottom = false,
  hasBorder = false,
  onPress,
  containerStyle,
}: IBaseMenuProps) {
  const style = useStyle();

  return (
    <View
      style={[
        style.BaseMenuContainer,
        isTop && style.BaseMenuContainerTop,
        isBottom && style.BaseMenuContainerBottom,
        containerStyle,
      ]}
    >
      <TouchableOpacity style={style.BaseMenuButton} onPress={onPress}>
        {label && <BaseText style={style.BaseMenuButtonLabel}>{label}</BaseText>}
        {children}
      </TouchableOpacity>

      {hasBorder && <View style={style.BaseMenuContainerBorder} />}
    </View>
  );
}
