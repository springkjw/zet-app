import useService from './service';
import ShopItemView from './view';

export default function ShopItemScreen() {
  const {priceData} = useService();

  return <ShopItemView priceData={priceData} />;
}
