import {useRoute} from '@react-navigation/native';

import useService from './service';
import ShopItemView from './view';

import type {BaseStackParamList, ShopItemRouteProp} from './type';

export default function ShopItemScreen() {
  const {
    params: {id: itemId},
  } = useRoute<ShopItemRouteProp>();

  const {data} = useService(itemId);

  return <ShopItemView data={data} />;
}
