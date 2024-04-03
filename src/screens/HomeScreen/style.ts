import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_800, GRAY_500, WHITE} from '@assets';
import {convertToRGBA} from '@utils';

export default function useStyle() {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  return useMemo(
    function () {
      return StyleSheet.create({
        Wrapper: {
          flex: 1,
          backgroundColor: GRAY_800,
        },
        ListHeaderComponent: {},
        HeaderWrapper: {},
        Header: {
          height: 64,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        HeaderContent: {
          borderColor: '#2D2D2D',
          borderBottomWidth: 1,
          overflow: 'hidden',
        },
        HeaderTitle: {
          color: WHITE,
          fontSize: 18,
          fontWeight: 'bold',
        },
        HeaderDescription: {
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
          color: GRAY_500,
          fontSize: 14,
          fontWeight: '400',
        },
        HeaderMore: {
          height: 64,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        HeaderContentItem: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 20,
          width,
          height: 40,
        },
        HeaderContentLastItem: {
          height: 52,
          paddingBottom: 12,
        },
        HeaderContentItemTitle: {
          width: 70,
          fontSize: 16,
          color: WHITE,
          fontWeight: '700',
        },
        HeaderContentItemOptionContainer: {
          flex: 1,
        },
        HeaderContentItemOption: {
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 8,
        },
        HeaderContentItemOptionText: {
          color: convertToRGBA(WHITE, 0.4),
          fontSize: 16,
          fontWeight: '400',
        },
        ListContent: {
          paddingBottom: insets.bottom + 20,
        },
        Separator: {
          height: 12,
        },
      });
    },
    [insets, width],
  );
}
