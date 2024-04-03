import type {IBrand} from '@models';

export interface LoginViewProps {
  step: number;
  shops: IBrand[];
  cards: IBrand[];
  nickname: string;
  selectedShop: string[];
  selectedCard: string[];
  onChangeNickname(value: string): void;
  onSelectShop(brandIds: string[]): void;
  onSelectCard(brandId: string): void;
  onNext(): void;
}
