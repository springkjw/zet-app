import {TouchableOpacity} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {Text} from '@components';
import {ChevronLeftIcon} from '@assets';
import useStyle from './style';

import type {BackProps} from './type';

export default function Back({label = ''}: BackProps) {
  const style = useStyle();
  const {dispatch, canGoBack} = useNavigation();

  return (
    <TouchableOpacity
      onPress={function () {
        if (canGoBack()) {
          dispatch(CommonActions.goBack());
        }
      }}
      style={style.BackContainer}>
      <ChevronLeftIcon size={20} />
      <Text font="SEMI_T18_150">{label ?? ''}</Text>
    </TouchableOpacity>
  );
}
