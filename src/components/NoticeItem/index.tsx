import {TouchableOpacity, View} from 'react-native';

import {ChevronRightIcon, GRAY_500} from '@assets';
import {Text} from '@components';
import useStyle from './style';

export default function NoticeItem() {
  const style = useStyle();

  return (
    <View style={style.NoticeItemContainer}>
      <View style={style.NoticeItemHeaderContainer}>
        <Text font="SEMI_T14_100" color={GRAY_500}>
          2023. 12. 29
        </Text>
        <TouchableOpacity style={style.NoticeItemButton}>
          <ChevronRightIcon />
        </TouchableOpacity>
      </View>
      <View>
        <Text font="SEMI_T14_100">
          v.1.0 업데이트 안내 드립니다. 1) 알림 기능이 추가되었...
        </Text>
      </View>
    </View>
  );
}
