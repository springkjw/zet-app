import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_700, GRAY_800, GRAY_500, GRAY_900, WHITE} from '@assets';
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
          paddingTop: 16,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        HeaderContent: {
          borderColor: GRAY_900,
          borderBottomWidth: 8,
          overflow: 'hidden',
        },
        HeaderDescriptionContainer: {
          borderWidth: 1,
          borderRadius: 100,
          height: 34,
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: GRAY_700,
          marginHorizontal: 20,
          marginVertical: 16,
        },
        HeaderDescription: {
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
          paddingTop: 8,
        },
        HeaderContentLastItem: {
          height: 52,
          paddingBottom: 20,
        },
        HeaderContentItemTitle: {width: 70},
        HeaderContentItemOptionContainer: {
          flex: 1,
          height: 28,
        },
        ListContent: {
          paddingBottom: insets.bottom + 20,
        },
        Separator: {
          height: 12,
        },
        FilterSepartor: {width: 6, height: 26},
      });
    },
    [insets, width],
  );
}
