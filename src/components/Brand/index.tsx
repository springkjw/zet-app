import {TouchableOpacity, View, Text as RNText} from 'react-native';

import {GRAY_500, WHITE} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {BrandProps} from './type';

export default function Brand({label, value, isSelected = false}: BrandProps) {
  const style = useStyle();

  return (
    <TouchableOpacity style={style.Container}>
      <View
        style={[
          style.ImageContainer,
          isSelected && style.ImageActiveContainer,
        ]}>
        {value === 'all' && <RNText style={style.AllText}>ALL</RNText>}
      </View>

      {value !== 'all' && isSelected && <View style={style.Mask} />}

      <Text font="SEMI_T16_100" color={isSelected ? WHITE : GRAY_500}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
