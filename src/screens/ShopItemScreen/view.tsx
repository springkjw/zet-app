import {View, ScrollView} from 'react-native';

import {Text} from '@components';
import useStyle from './style';

export default function ShopItemView() {
  const style = useStyle();

  return (
    <View style={style.Wrapper}>
      <ScrollView>
        <View>
          <Text>코카콜라 음료</Text>
          <Text>코카콜라 제로 190ml (12개)</Text>
        </View>
      </ScrollView>
    </View>
  );
}
