import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
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
  }, []);
}
