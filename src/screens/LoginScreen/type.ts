import type {IBrand} from '@models';

export interface LoginViewProps {
  step: number;
  shops: IBrand[];
  cards: IBrand[];
  nickname: string;
  selectedShop: IBrand[];
  selectedCard: IBrand[];
  onChangeNickname(value: string): void;
  onSelectShop(brandIds: IBrand[]): void;
  onSelectCard(brandId: IBrand): void;
  onNext(): void;
}
