import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_800, WHITE} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      Container: {
        flex: 1,
        backgroundColor: GRAY_800,
      },
      UserInfoContainer: {
        paddingHorizontal: 20,
        height: 96,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
      UserInfoImage: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: WHITE,
      },
      UserInfoTextContainer: {},
      Opcity50: {opacity: 0.5},
      Opcity90: {opacity: 0.9, marginTop: 8},
      Space: {
        height: 8,
        backgroundColor: '#171717',
      },
      InfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        paddingLeft: 20,
      },
      InfoButton: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, []);
}
