import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RED_50, RED_500, GRAY_700} from '@assets';

export default function useStyle() {
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        Container: {
          flex: 1,
          backgroundColor: GRAY_700,
          paddingBottom: insets.bottom + 16,
          paddingLeft: 20,
          paddingRight: 20,
        },
        Content: {
          flex: 1,
        },
        ContentTextContainer: {
          paddingBottom: 40,
        },
        ContentText: {
          fontSize: 20,
          color: RED_50,
          fontWeight: '500',
          lineHeight: 30,
          textAlign: 'center',
        },
        ContentStringText: {
          color: RED_500,
          fontWeight: '500',
        },
        BottomContainer: {},
        AgreeTextContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        AgreeText: {
          color: RED_50,
          fontSize: 12,
          fontWeight: '400',
          paddingBottom: 16,
          paddingTop: 16,
        },
        AgreeTextStrike: {
          textDecorationLine: 'underline',
        },
      });
    },
    [insets],
  );
}
