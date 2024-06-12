import type {ViewStyle} from 'react-native';
import type {IBrand} from '@models';

export interface BrandProps {
  data?: IBrand;
  isSelected?: boolean;
  size?: number;
  canSelect?: boolean;
  hasName?: boolean;
  style?: ViewStyle;
  onSelect?(brand: IBrand): void;
}

export interface StyleProps {
  background?: string | null;
  border?: string | null;
  size: number;
}
