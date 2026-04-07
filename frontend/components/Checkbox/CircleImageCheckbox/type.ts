import type { ViewStyle } from "react-native";

export interface ICircleImageCheckboxProps {
  image?: string;
  name?: string;
  checked?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export interface ICircleImageCheckboxStyle {
  checked?: boolean;
}
