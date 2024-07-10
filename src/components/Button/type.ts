import type {ViewStyle} from 'react-native';

export interface ButtonProps {
  label: string;
  style?: ViewStyle;
  disabled?: boolean;
  onPress?(): void;
}
