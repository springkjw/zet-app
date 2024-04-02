import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {RED_600} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      Button: {
        height: 65,
        borderRadius: 100,
        backgroundColor: RED_600,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, []);
}
