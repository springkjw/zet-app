import {useCallback} from 'react';
import {View, Pressable} from 'react-native';
import {Image} from 'expo-image';
import {useNavigation} from '@react-navigation/native';

import {Text, Brand} from '@components';
import {GRAY_100, GRAY_500, RED_500} from '@assets';
import useStyle from './style';

import type {StackNavigationProp} from '@react-navigation/stack';
import type {ShopItemProps, BaseStackParamList} from './type';

export default function ShopItem({data}: ShopItemProps) {
  const style = useStyle();
  const {navigate} = useNavigation<StackNavigationProp<BaseStackParamList>>();

  const onPress = useCallback(
    function () {
      if (!data?.id) {
        return;
      }
      navigate('ShopItem', {params: {id: data?.id}});
    },
    [navigate, data?.id],
  );

  return (
    <Pressable onPress={onPress}>
      <View style={style.Wrapper}>
        <View style={style.InfoContainer}>
          <Image style={style.Image} source={data?.image} />
          <View style={style.InfoContent}>
            <View>
              {data?.isLowestPrice && (
                <View style={style.TipContainer}>
                  <View style={style.Tip}>
                    <Text font="MEDIUM_T12_100" color={RED_500}>
                      역대최저가
                    </Text>
                  </View>
                </View>
              )}

              <Text font="SEMI_T14_100" style={style.Title}>
                {data?.title ?? ''}
              </Text>
            </View>
            <View style={style.PriceContainer}>
              <Text
                font="SEMI_T16_100"
                color={RED_500}
                style={[style.PriceDiscountText]}>
                24%
              </Text>
              <Text font="SEMI_T16_100">16,000원</Text>
            </View>
          </View>
        </View>

        {data?.brands && data?.brands?.length > 0 && (
          <View style={style.CardContainer}>
            <Text font="SEMI_T14_100" color={GRAY_500} style={style.CardTitle}>
              카드혜택
            </Text>

            <View style={style.CardBrandItemContainer}>
              {data?.brands.map(function (brand) {
                return (
                  <View style={style.CardBrandItem}>
                    <Text
                      font="SEMI_T14_100"
                      color={GRAY_100}
                      style={style.CardBrandItemText}>
                      {brand.name}
                    </Text>
                    <Brand
                      size={20}
                      hasName={false}
                      canSelect={false}
                      data={brand}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}
