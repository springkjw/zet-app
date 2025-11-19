import type { ViewStyle } from "react-native";

export default interface IBaseMenuProps {
  // Content
  label?: string;
  children?: React.ReactNode;

  // Layout
  isTop?: boolean;
  isBottom?: boolean;
  hasBorder?: boolean;

  // Interaction
  onPress?: () => void;

  // Style overrides
  containerStyle?: ViewStyle;
}
