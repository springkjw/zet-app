import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_800} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      Container: {
        flex: 1,
        backgroundColor: GRAY_800,
      },
    });
  }, []);
}
