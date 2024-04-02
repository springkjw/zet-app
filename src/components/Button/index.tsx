import {TouchableOpacity} from 'react-native';

import {Text} from '@components';
import useStyle from './style';

import type {ButtonProps} from './type';

export default function Button({label, onPress}: ButtonProps) {
  const style = useStyle();

  return (
    <TouchableOpacity onPress={onPress} style={style.Button}>
      <Text font="PRIMARY_BUTTON">{label}</Text>
    </TouchableOpacity>
  );
}
