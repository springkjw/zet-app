import type {RouteProp, ParamListBase} from '@react-navigation/native';
import type {IItem} from '@models';

export interface ShopItemViewProps {
  data?: IItem;
}

export interface ShopItemScreenParams {
  id: string;
}

export interface ShopItemRouteProp extends RouteProp<ParamListBase> {
  params: ShopItemScreenParams;
}

export type BasetackParamList = {};
