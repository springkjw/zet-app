import {View, ScrollView, Switch} from 'react-native';

import {Text} from '@components';
import {RED_600, GRAY_500} from '@assets';
import useStyle from './style';

import type {NotificationSettingViewProps} from './type';

export default function NotificationSettingView({
  data,
  onChange,
}: NotificationSettingViewProps) {
  const style = useStyle();

  return (
    <View style={style.NotificationSettingContainer}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={style.NotificationSettingHeader}>
          <Text font="SEMI_T14_150">
            가격 알림을 받고 싶은 항목의 알림을 설정해주세요.
          </Text>
        </View>

        <View style={style.NotificationSettingItem}>
          <Text font="SEMI_T18_100">핫딜</Text>
          <Switch
            value={data?.hotDeal ?? false}
            onValueChange={function (value) {
              return onChange('hotDeal', value);
            }}
            style={style.NotificationSettingSwitch}
            trackColor={{true: RED_600, false: GRAY_500}}
          />
        </View>

        <View style={style.NotificationSettingItem}>
          <Text font="SEMI_T18_100">최저가</Text>
          <Switch
            value={data?.lowestPrice ?? false}
            onValueChange={function (value) {
              return onChange('lowestPrice', value);
            }}
            style={style.NotificationSettingSwitch}
            trackColor={{true: RED_600, false: GRAY_500}}
          />
        </View>

        <View style={style.NotificationSettingItem}>
          <Text font="SEMI_T18_100">가격변동</Text>
          <Switch
            value={data?.priceChange ?? false}
            onValueChange={function (value) {
              return onChange('priceChange', value);
            }}
            style={style.NotificationSettingSwitch}
            trackColor={{true: RED_600, false: GRAY_500}}
          />
        </View>

        <View style={style.NotificationSettingDivier} />

        <View style={style.NotificationSettingItem}>
          <Text font="SEMI_T18_100">야간알림</Text>
          <Switch
            value={data?.night ?? false}
            onValueChange={function (value) {
              return onChange('night', value);
            }}
            style={style.NotificationSettingSwitch}
            trackColor={{true: RED_600, false: GRAY_500}}
          />
        </View>
      </ScrollView>
    </View>
  );
}
