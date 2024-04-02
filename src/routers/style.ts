import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_700} from '@assets';

export function useRootStyle() {
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        GestureView: {
          flex: 1,
          backgroundColor: GRAY_700,
        },
        Header: {
          height: 50 + insets.top,
          backgroundColor: GRAY_700,
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
        HeaderRight: {
          right: 20,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        HeaderRightItem: {
          height: 50,
          width: 32,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 8,
        },
      });
    },
    [insets],
  );
}
