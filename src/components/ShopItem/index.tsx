import {useCallback} from 'react';
import {View, Pressable, Text, Image} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import useStyle from './style';

export default function ShopItem() {
  const style = useStyle();
  const {navigate} = useNavigation();

  const onPress = useCallback(
    function () {
      navigate('ShopItem');
    },
    [navigate],
  );

  return (
    <Pressable onPress={onPress}>
      <View style={style.Wrapper}>
        <View style={style.InfoContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#EBEBEB', '#C1C1C1']}
            style={style.ImageContainer}>
            <Image style={style.Image} />
          </LinearGradient>
          <View style={style.InfoContent}>
            <View style={style.TipContainer}>
              <View style={style.Tip}>
                <Text style={style.TipText}>역대최저가</Text>
              </View>
            </View>

            <Text style={[style.BaseText, style.Title]}>
              코카콜라 제로 190ml 36개
            </Text>
            <View style={style.PriceContainer}>
              <Text style={[style.BaseText, style.PriceDiscountText]}>24%</Text>
              <Text style={[style.BaseText, style.PriceText]}>16,000원</Text>
            </View>
          </View>
        </View>

        <View style={style.CardContainer}>
          <Text style={[style.BaseText, style.CardTitle]}>카드혜택</Text>

          <View>
            <View>
              <Text style={style.BaseText}>신한</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
