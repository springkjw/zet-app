import {TouchableOpacity, View, Text as RNText} from 'react-native';
import {Image} from 'expo-image';

import {GRAY_500, WHITE} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {BrandProps} from './type';

export default function Brand({
  data,
  size = 70,
  isSelected = false,
  canSelect = true,
  hasName = true,
  onSelect,
  style,
}: BrandProps) {
  const innerStyle = useStyle({
    background: data?.backgroundColor || '#2C2C2C',
    border: data?.borderColor || '#393939',
    size,
  });

  return (
    <TouchableOpacity
      disabled={!canSelect}
      onPress={function () {
        return onSelect && data && onSelect(data);
      }}
      style={[innerStyle.Container, style]}>
      <View
        style={[
          innerStyle.ImageContainer,
          isSelected && innerStyle.ImageActiveContainer,
        ]}>
        {!data?.id && <RNText style={innerStyle.AllText}>ALL</RNText>}

        {data?.image && <Image source={data?.image} style={innerStyle.Image} />}
      </View>

      {data?.id && isSelected && <View style={innerStyle.Mask} />}

      {hasName && (
        <Text font="SEMI_T16_100" color={isSelected ? WHITE : GRAY_500}>
          {data?.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}
