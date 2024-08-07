import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {WHITE} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      BackContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        gap: 16,
      },
    });
  }, []);
}
