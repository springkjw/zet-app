import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_700} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      NoticeItemContainer: {
        backgroundColor: GRAY_700,
        borderRadius: 8,
        paddingLeft: 16,
        paddingBottom: 20,
        flexDirection: 'column',
      },
      NoticeItemHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      NoticeItemButton: {
        width: 46,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
      },
      NoticeTitleContainer: {
        paddingRight: 16,
      },
    });
  }, []);
}
