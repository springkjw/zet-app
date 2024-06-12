import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      InfoChipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 32,
        borderRadius: 100,
        backgroundColor: 'rgba(72, 89, 244, 0.15)',
      },
      InfoChipText: {
        marginLeft: 4,
        paddingTop: 3,
      },
    });
  }, []);
}
