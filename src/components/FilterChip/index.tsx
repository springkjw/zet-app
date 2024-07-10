import {useState, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';

import {Text} from '@components';
import {PURPLE_600, WHITE} from '@assets';
import useStyle from './style';

export default function FilterChip({label, isChecked = false}) {
  const [checked, setChecked] = useState<boolean>(isChecked);
  const style = useStyle(checked);

  const onPress = useCallback(function () {
    setChecked(prev => !prev);
  }, []);

  return (
    <TouchableOpacity style={style.FilterChopContainer} onPress={onPress}>
      <Text font="SEMI_T14_100" color={checked ? PURPLE_600 : WHITE}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
