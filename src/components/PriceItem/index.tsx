import {View} from 'react-native';

import {Brand, Text} from '@components';
import {GRAY_400} from '@assets';
import useStyle from './style';

export default function PriceItem() {
  const style = useStyle();

  return (
    <View style={style.PriceItemContainer}>
      <View style={style.PriceItemBrandContainer}>
        <Brand size={48} canSelect={false} isSelected={false} hasName={false} />
        <Text font="SEMI_T18_100" style={style.PriceItemPriceText}>
          16,900원
        </Text>
      </View>

      <View style={style.PriceItemPriceInfoContainer}>
        <Text
          font="SEMI_T14_100"
          color={GRAY_400}
          style={style.PriceItemPriceCardText}>
          신한카드 18,200원
        </Text>
        <Text font="SEMI_T14_100" color={GRAY_400}>
          배송비 3,000원
        </Text>
      </View>
    </View>
  );
}
