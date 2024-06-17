import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_800} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      NotificationSettingContainer: {
        flex: 1,
        backgroundColor: GRAY_800,
      },
      NotificationSettingHeader: {
        paddingHorizontal: 20,
        paddingBottom: 20,
      },
      NotificationSettingItem: {
        height: 64,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      NotificationSettingSwitch: {height: 24},
      NotificationSettingDivier: {height: 8, backgroundColor: '#171717'},
    });
  }, []);
}
