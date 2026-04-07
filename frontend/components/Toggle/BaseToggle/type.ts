import { StyleProp, ViewStyle } from "react-native";

export type TToggleSize = "small" | "medium" | "large";

export default interface IBaseToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: TToggleSize;
  style?: StyleProp<ViewStyle>;
}

export interface IBaseToggleStyle {
  value: boolean;
  disabled: boolean;
  size: TToggleSize;
  pressed: boolean;
}
