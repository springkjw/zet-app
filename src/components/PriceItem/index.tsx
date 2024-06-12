import {View} from 'react-native';

import {Brand, Text} from '@components';
import useStyle from './style';

export default function PriceItem() {
  const style = useStyle();

  return (
    <View style={style.PriceItemContainer}>
      <View>
        <Brand />
        <Text style={style.PriceItemPriceText}>16,900원</Text>
      </View>

      <View style={style.PriceItemPriceInfoContainer}>
        <Text style={style.PriceItemPriceCardText}>신한카드 18,200원</Text>
        <Text>배송비 3,000원</Text>
      </View>
    </View>
  );
}
