import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';

import {ChevronDownIcon} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {NoticeListViewProps} from './type';

export default function SettingView({nickname, goToPage}: NoticeListViewProps) {
  const style = useStyle();

  return (
    <View style={style.Container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={style.UserInfoContainer}>
          <Image style={style.UserInfoImage} />
          <View style={style.UserInfoTextContainer}>
            <Text font="SEMI_T16_100">
              {nickname ?? ''}
              <Text style={style.Opcity50}>님</Text>
            </Text>
            <Text font="SEMI_T16_100" style={style.Opcity90}>
              오늘도 시원한 콜라 한 잔 하셨나요?
            </Text>
          </View>
        </View>

        <View style={style.InfoItem}>
          <Text font="SEMI_T18_100">가격 알림 설정</Text>
          <TouchableOpacity
            onPress={function () {
              return goToPage('notificationSetting');
            }}
            style={style.InfoButton}>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>

        <View style={style.Space} />

        <View style={style.InfoItem}>
          <Text font="SEMI_T18_100">공지사항</Text>
          <TouchableOpacity
            onPress={function () {
              return goToPage('notice');
            }}
            style={style.InfoButton}>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>

        <View style={style.InfoItem}>
          <Text font="SEMI_T18_100">문의하기</Text>
          <TouchableOpacity style={style.InfoButton}>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>

        <View style={style.Space} />

        <View style={style.InfoItem}>
          <Text font="SEMI_T18_100">서비스 이용약관</Text>
          <TouchableOpacity style={style.InfoButton}>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>

        <View style={style.InfoItem}>
          <Text font="SEMI_T18_100">개인정보 처리방침</Text>
          <TouchableOpacity style={style.InfoButton}>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>

        <View style={style.InfoItem}>
          <Text font="SEMI_T18_100">회원탈퇴</Text>
          <TouchableOpacity style={style.InfoButton}>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
