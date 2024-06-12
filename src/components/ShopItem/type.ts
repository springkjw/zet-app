import type {IItemSimple} from '@models';

export interface ShopItemProps {
  data?: IItemSimple;
}

export interface ShopItemScreenParams {
  id: string;
}

export type BaseStackParamList = {
  ShopItem: {
    params: ShopItemScreenParams;
  };
};
