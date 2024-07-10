import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {GRAY_700, GRAY_900} from '@assets';

export default function useStyle() {
  const {width} = useWindowDimensions();

  return useMemo(
    function () {
      return StyleSheet.create({
        PeriodTabContainer: {
          height: 48,
          borderRadius: 100,
          flexDirection: 'row',
          backgroundColor: GRAY_900,
          position: 'relative',
          padding: 8,
          gap: 8,
        },
        PeriodTabAnimatedBackground: {
          position: 'absolute',
          width: (width - 72) / 3,
          height: 32,
          backgroundColor: GRAY_700,
          borderRadius: 100,
          top: 8,
          left: 8,
        },
        PeriodTabButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
    },
    [width],
  );
}
