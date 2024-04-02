import {Text as RNText} from 'react-native';

import {WHITE} from '@assets';
import useStyle from './style';

import type {TextProps} from './type';

export default function Text({
  font = 'MEDIUM_T16_150',
  color = WHITE,
  children,
  style,
}: TextProps) {
  const textStyle = useStyle({font, color});

  return <RNText style={[textStyle, style]}>{children}</RNText>;
}
