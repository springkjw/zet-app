import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_700} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      Wrapper: {
        flex: 1,
        backgroundColor: GRAY_700,
      },
    });
  }, []);
}
