import {View} from 'react-native';

import useStyle from './style';

export default function SettingView() {
  const style = useStyle();

  return <View style={style.Container}></View>;
}
