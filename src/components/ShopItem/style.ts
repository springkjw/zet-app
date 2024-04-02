import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {WHITE, BLACK} from '@assets';
import {convertToRGBA} from '@utils';

export default function useStyle() {
  const {width} = useWindowDimensions();

  return useMemo(
    function () {
      return StyleSheet.create({
        Wrapper: {
          width: width - 40,
          backgroundColor: convertToRGBA(WHITE, 0.08),
          height: 165,
          borderRadius: 8,
          marginLeft: 20,
          padding: 16,
        },
        BaseText: {
          color: WHITE,
          fontSize: 16,
          fontWeight: '400',
        },
        InfoContainer: {
          flex: 1,
          flexDirection: 'row',
        },
        InfoContent: {
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 12,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
        CardContainer: {
          paddingTop: 13,
          borderColor: '#2D2D2D',
          borderTopWidth: 1,
          flexDirection: 'row',
        },
        ImageContainer: {
          width: 80,
          height: 80,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        },
        Image: {},
        TipContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 10,
        },
        Tip: {
          backgroundColor: '#FF4D4D',
          height: 20,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 6,
        },
        TipText: {
          fontSize: 12,
          color: BLACK,
          fontWeight: '700',
        },
        Title: {
          marginBottom: 10,
        },
        PriceContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        PriceDiscountText: {
          color: '#FF4D4D',
          fontWeight: '700',
          marginRight: 4,
        },
        PriceText: {
          fontWeight: '700',
        },
        CardTitle: {
          color: convertToRGBA(WHITE, 0.65),
          marginRight: 22,
        },
      });
    },
    [width],
  );
}
