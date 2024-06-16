import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import SettingView from './view';

import type {StackNavigationProp} from '@react-navigation/stack';
import type {BaseStackParamList} from './type';

export default function SettingScreen() {
  const {navigate} = useNavigation<StackNavigationProp<BaseStackParamList>>();

  const goToPage = useCallback(
    function (page: 'notice') {
      switch (page) {
        case 'notice':
          navigate('NoticeList');
          break;
      }
    },
    [navigate],
  );

  return <SettingView goToPage={goToPage} />;
}
