import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

export default interface IBaseMenuProps {
  label?: string;
  children?: ReactNode;
  isTop?: boolean;
  isBottom?: boolean;
  hasBorder?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}
