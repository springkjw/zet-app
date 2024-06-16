import {Text as RNText} from 'react-native';

import {WHITE} from '@assets';
import useStyle from './style';

import type {TextProps} from './type';

export default function Text({
  font = 'MEDIUM_T16_150',
  color = WHITE,
  numberOfLines,
  children,
  style,
}: TextProps) {
  const textStyle = useStyle({font, color});

  return (
    <RNText numberOfLines={numberOfLines} style={[textStyle, style]}>
      {children}
    </RNText>
  );
}
