import type {IBrand} from '@models';

export interface BrandProps {
  data: IBrand;
  isSelected?: boolean;
  onSelect?(brand: IBrand): void;
}

export interface StyleProps {
  background?: string | null;
  border?: string | null;
}
