import type {IBrand} from '@models';

export interface LoginViewProps {
  step: number;
  brands: IBrand[];
  nickname: string;
  selectedBrands: string[];
  onChangeNickname(value: string): void;
  onSelectBrand(brandIds: string[]): void;
  onNext(): void;
}
