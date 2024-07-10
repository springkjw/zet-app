import {TouchableOpacity} from 'react-native';

import {Text} from '@components';
import {WHITE} from '@assets';
import useStyle from './style';

import type {ButtonProps} from './type';

export default function Button({
  label,
  onPress,
  style,
  disabled = false,
}: ButtonProps) {
  const innerStyle = useStyle();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[innerStyle.Button, style, disabled && innerStyle.ButtonDisabled]}>
      <Text font="PRIMARY_BUTTON" color={disabled ? '#5A5A5A' : WHITE}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
