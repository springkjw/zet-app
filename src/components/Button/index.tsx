import {TouchableOpacity} from 'react-native';

import {Text} from '@components';
import useStyle from './style';

import type {ButtonProps} from './type';

export default function Button({label, onPress, style}: ButtonProps) {
  const innerStyle = useStyle();

  return (
    <TouchableOpacity onPress={onPress} style={[innerStyle.Button, style]}>
      <Text font="PRIMARY_BUTTON">{label}</Text>
    </TouchableOpacity>
  );
}
