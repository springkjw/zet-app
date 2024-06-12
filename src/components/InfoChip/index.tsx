import {View} from 'react-native';

import {PURPLE_500, GRAY_500, InfoIcon} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {InfoChipProps} from './type';

export default function InfoChip({label = '', style}: InfoChipProps) {
  const innerStyle = useStyle();

  return (
    <View style={[innerStyle.InfoChipContainer, style]}>
      <InfoIcon color={GRAY_500} />
      <Text
        font="SEMI_T14_100"
        color={PURPLE_500}
        style={innerStyle.InfoChipText}>
        {label}
      </Text>
    </View>
  );
}
