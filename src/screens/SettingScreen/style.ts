import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_500, GRAY_800, WHITE} from '@assets';

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
      WithdrawWrapper: {marginHorizontal: 20},
      WithdrawContaienr: {},
      WithdrawBackground: {
        backgroundColor: '#262525',
        height: 254,
        padding: 20,
        borderRadius: 16,
      },
      WithdrawContentContainer: {
        flex: 1,
        marginTop: 44,
        height: 254,
        borderRadius: 16,
        padding: 20,
      },
      WithdrawDescription: {
        paddingVertical: 16,
      },
      WithdrawActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
      },
      WithdrawButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        backgroundColor: GRAY_500,
      },
      WithdrawButtonSubmit: {
        backgroundColor: '#E6E6E6',
      },
    });
  }, []);
}
