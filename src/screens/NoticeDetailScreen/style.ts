import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_600, GRAY_800} from '@assets';

export default function useStyle() {
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        NoticeDetailContainer: {
          flex: 1,
          backgroundColor: GRAY_800,
        },
        NoticeDetailContentContainer: {
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 16 + insets.bottom,
        },
        NoticeTitleContainer: {
          flexDirection: 'column',
          gap: 8,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_600,
        },
        NoticeContentContainer: {
          paddingTop: 16,
        },
      });
    },
    [insets],
  );
}
