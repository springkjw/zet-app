import {TouchableOpacity, View, Text as RNText} from 'react-native';
import {Image} from 'expo-image';

import {GRAY_500, WHITE} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {BrandProps} from './type';

export default function Brand({
  data,
  isSelected = false,
  onSelect,
}: BrandProps) {
  const style = useStyle({
    background: data.backgroundColor,
    border: data.borderColor,
  });

  return (
    <TouchableOpacity
      onPress={function () {
        return onSelect && onSelect(data.id);
      }}
      style={style.Container}>
      <View
        style={[
          style.ImageContainer,
          isSelected && style.ImageActiveContainer,
        ]}>
        {!data.id && <RNText style={style.AllText}>ALL</RNText>}

        {data.image && <Image source={data.image} style={style.Image} />}
      </View>

      {data.id && isSelected && <View style={style.Mask} />}

      <Text font="SEMI_T16_100" color={isSelected ? WHITE : GRAY_500}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
}
