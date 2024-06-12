import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {WHITE, GRAY_600, GRAY_700} from '@assets';

export default function useStyle() {
  const {width} = useWindowDimensions();

  return useMemo(
    function () {
      return StyleSheet.create({
        Wrapper: {
          width: width - 40,
          backgroundColor: GRAY_700,
          maxHeight: 160,
          borderRadius: 8,
          marginLeft: 20,
          padding: 16,
        },
        InfoContainer: {
          flexDirection: 'row',
          paddingBottom: 16,
          paddingTop: 4,
        },
        InfoContent: {
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 12,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: 72,
        },
        Title: {paddingTop: 4},
        PriceContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        PriceDiscountText: {marginRight: 4},
        Image: {
          width: 72,
          height: 72,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: GRAY_600,
        },
        TipContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 6,
        },
        Tip: {
          backgroundColor: 'rgba(243, 78, 75, 0.12)',
          height: 20,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 6,
          paddingTop: 2,
        },
        CardContainer: {
          paddingTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          borderTopWidth: 1,
          borderTopColor: GRAY_600,
        },
        CardTitle: {marginRight: 16},
        CardBrandItemContainer: {
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 8,
        },
        CardBrandItem: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        CardBrandItemText: {marginRight: 4},
      });
    },
    [width],
  );
}
