import type {IBrand} from '@models';

export interface BrandProps {
  data: IBrand;
  isSelected?: boolean;
  onSelect?(brandId: string | null): void;
}

export interface StyleProps {
  background?: string | null;
  border?: string | null;
}
