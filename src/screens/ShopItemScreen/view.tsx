import {View, ScrollView} from 'react-native';

import useStyle from './style';

export default function ShopItemView() {
  const style = useStyle();

  return (
    <View style={style.Wrapper}>
      <ScrollView></ScrollView>
    </View>
  );
}
