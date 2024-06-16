import dayjs from 'dayjs';
import {View, ScrollView} from 'react-native';

import {Text} from '@components';
import {GRAY_300, GRAY_500} from '@assets';
import useStyle from './style';

import type {NoticeDetailViewProps} from './type';

export default function NoticeDetailView({data}: NoticeDetailViewProps) {
  const style = useStyle();

  return (
    <View style={style.NoticeDetailContainer}>
      <ScrollView
        contentContainerStyle={style.NoticeDetailContentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={style.NoticeTitleContainer}>
          <Text font="SEMI_T14_100" color={GRAY_500}>
            {dayjs(data?.created).format('YYYY.MM.DD')}
          </Text>
          <Text font="SEMI_T16_150">{data?.title ?? ''}</Text>
        </View>

        <View style={style.NoticeContentContainer}>
          <Text font="SEMI_T14_150" color={GRAY_300}>
            {data?.content ?? ''}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
