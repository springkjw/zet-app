import {useRef, useMemo, useCallback} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Image} from 'expo-image';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

import {BLACK, ChevronDownIcon} from '@assets';
import {Text} from '@components';
import useStyle from './style';

import type {NoticeListViewProps} from './type';

export default function SettingView({
  nickname,
  goToPage,
  onWithdraw,
}: NoticeListViewProps) {
  const {height} = useWindowDimensions();
  const style = useStyle();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(
    function () {
      return ['10%', (height - 254) / 2];
    },
    [height],
  );

  const handleWithdraw = useCallback(function (isOpen: boolean) {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, []);

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

        <TouchableOpacity
          style={style.InfoItem}
          onPress={function () {
            return goToPage('notificationSetting');
          }}>
          <Text font="SEMI_T18_100">가격 알림 설정</Text>
          <View style={style.InfoButton}>
            <ChevronDownIcon />
          </View>
        </TouchableOpacity>

        <View style={style.Space} />

        <TouchableOpacity
          style={style.InfoItem}
          onPress={function () {
            return goToPage('notice');
          }}>
          <Text font="SEMI_T18_100">공지사항</Text>
          <View style={style.InfoButton}>
            <ChevronDownIcon />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.InfoItem}>
          <Text font="SEMI_T18_100">문의하기</Text>
          <View style={style.InfoButton}>
            <ChevronDownIcon />
          </View>
        </TouchableOpacity>

        <View style={style.Space} />

        <TouchableOpacity style={style.InfoItem}>
          <Text font="SEMI_T18_100">서비스 이용약관</Text>
          <View style={style.InfoButton}>
            <ChevronDownIcon />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.InfoItem}>
          <Text font="SEMI_T18_100">개인정보 처리방침</Text>
          <View style={style.InfoButton}>
            <ChevronDownIcon />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.InfoItem}
          onPress={function () {
            return handleWithdraw(true);
          }}>
          <Text font="SEMI_T18_100">회원탈퇴</Text>
          <View style={style.InfoButton}>
            <ChevronDownIcon />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        bottomInset={(height - 254) / 2}
        detached={true}
        handleComponent={null}
        enablePanDownToClose={false}
        containerStyle={style.WithdrawContaienr}
        backgroundStyle={style.WithdrawBackground}
        style={style.WithdrawWrapper}>
        <BottomSheetView style={style.WithdrawContentContainer}>
          <Text font="SEMI_T18_150">
            ZET와의 최저가 탐색을 정말{'\n'}그만두시겠어요?
          </Text>
          <Text
            font="SEMI_T16_150"
            color="#CFCFCF"
            style={style.WithdrawDescription}>
            탈퇴 시 회원님이 설정한 카드 및 알림 조건은 복구할 수 없어요.
          </Text>
          <Text font="SEMI_T16_150" color="#CFCFCF">
            확인 선택 시 바로 탈퇴됩니다.
          </Text>

          <View style={style.WithdrawActionContainer}>
            <TouchableOpacity
              style={style.WithdrawButton}
              onPress={function () {
                return handleWithdraw(false);
              }}>
              <Text font="SEMI_T16_100">취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[style.WithdrawButton, style.WithdrawButtonSubmit]}
              onPress={function () {
                handleWithdraw(false);
                onWithdraw();
              }}>
              <Text font="SEMI_T16_100" color={BLACK}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
