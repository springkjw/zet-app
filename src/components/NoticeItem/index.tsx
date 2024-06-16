import dayjs from 'dayjs';
import {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ChevronRightIcon, GRAY_500} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {StackNavigationProp} from '@react-navigation/stack';
import type {NoticeItemProps, BaseStackParamList} from './type';

export default function NoticeItem({data}: NoticeItemProps) {
  const style = useStyle();
  const {navigate} = useNavigation<StackNavigationProp<BaseStackParamList>>();

  const goToNoticeDetail = useCallback(
    function (noticeId: string) {
      if (!noticeId) {
        return;
      }
      navigate('NoticeDetail', {params: {id: noticeId}});
    },
    [navigate],
  );

  return (
    <View style={style.NoticeItemContainer}>
      <View style={style.NoticeItemHeaderContainer}>
        <Text font="SEMI_T14_100" color={GRAY_500}>
          {dayjs(data.created).format('YYYY.MM.DD')}
        </Text>
        <TouchableOpacity
          onPress={function () {
            return goToNoticeDetail(data.id);
          }}
          style={style.NoticeItemButton}>
          <ChevronRightIcon />
        </TouchableOpacity>
      </View>
      <View style={style.NoticeTitleContainer}>
        <Text numberOfLines={1} font="SEMI_T14_100">
          {data.title}
        </Text>
      </View>
    </View>
  );
}
