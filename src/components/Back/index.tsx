import {TouchableOpacity, Text} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {ChevronLeftIcon} from '@assets';
import useStyle from './style';

export default function Back({label}) {
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
      <ChevronLeftIcon />
      <Text style={style.BackText}>{label ?? ''}</Text>
    </TouchableOpacity>
  );
}
