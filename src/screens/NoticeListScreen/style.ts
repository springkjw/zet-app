import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_800} from '@assets';

export default function useStyle() {
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        NoticeListContainer: {
          flex: 1,
          backgroundColor: GRAY_800,
        },
        NoticeListContentContainer: {
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 16 + insets.bottom,
        },
        NoticetionListSeparator: {height: 12},
      });
    },
    [insets],
  );
}
