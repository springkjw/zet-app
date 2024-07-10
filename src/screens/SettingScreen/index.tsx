import {useCallback} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {useUser} from '@services';
import SettingView from './view';

import type {StackNavigationProp} from '@react-navigation/stack';
import type {BaseStackParamList} from './type';

export default function SettingScreen() {
  const {user, onLogout} = useUser();
  const {dispatch, navigate} =
    useNavigation<StackNavigationProp<BaseStackParamList>>();

  const goToPage = useCallback(
    function (page: 'notice' | 'notificationSetting') {
      switch (page) {
        case 'notice':
          navigate('NoticeList', {});
          break;
        case 'notificationSetting':
          navigate('NotificationSetting', {});
          break;
      }
    },
    [navigate],
  );

  const onWithdraw = useCallback(
    function () {
      onLogout();
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthRouter'}],
        }),
      );
    },
    [onLogout, dispatch],
  );

  return (
    <SettingView
      nickname={user.nickname}
      goToPage={goToPage}
      onWithdraw={onWithdraw}
    />
  );
}
