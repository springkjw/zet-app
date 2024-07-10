import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_800, TRANSPARENT, WHITE} from '@assets';

export function useRootStyle() {
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        GestureView: {
          flex: 1,
          backgroundColor: GRAY_800,
        },
        Header: {
          height: 50 + insets.top,
          backgroundColor: GRAY_800,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        Logo: {
          width: 40,
          height: 40,
          left: 20,
          bottom: 5,
        },
        BackContainer: {
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        BackText: {
          fontFamily: 'SUIT-Bold',
          color: WHITE,
          fontSize: 18,
          lineHeight: 18,
          letterSpacing: -18 * 0.02,
        },
      });
    },
    [insets],
  );
}
