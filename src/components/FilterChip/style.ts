import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {PURPLE_600, GRAY_700} from '@assets';
import {convertToRGBA} from '@utils';

export default function useStyle(checked: boolean) {
  return useMemo(
    function () {
      return StyleSheet.create({
        FilterChopContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          borderColor: checked ? convertToRGBA(PURPLE_600, 0.5) : GRAY_700,
          borderWidth: 1,
          height: 26,
          paddingHorizontal: 10,
          paddingTop: 5,
          backgroundColor: checked
            ? convertToRGBA(PURPLE_600, 0.1)
            : 'transparent',
        },
      });
    },
    [checked],
  );
}
