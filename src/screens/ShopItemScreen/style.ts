import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_700, GRAY_800, GRAY_900, PURPLE_500} from '@assets';

export default function useStyle() {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        Wrapper: {
          flex: 1,
          backgroundColor: GRAY_800,
        },
        ScrollContentContainer: {paddingBottom: insets.bottom + 24},
        Divider: {
          height: 8,
          backgroundColor: GRAY_900,
          marginTop: 24,
        },
        Separator: {
          height: 8,
          backgroundColor: GRAY_800,
        },
        Image: {width, height: 180},
        InfoContainer: {paddingBottom: 24, paddingHorizontal: 20},
        InfoForm: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 30,
        },
        InfoLabel: {minWidth: 70},
        InfoCategory: {marginBottom: 8},
        InfoTitle: {marginBottom: 12},
        InfoBrand: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        InfoChip: {marginLeft: 6},
        InfoButton: {marginTop: 32},

        CardBenefitContainer: {
          backgroundColor: GRAY_700,
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingVertical: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: 20,
          marginLeft: 20,
        },
        CardBenefitPriceContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        },
        CardBenefitBrandContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        CardBenefitBrand: {marginLeft: 8},

        StatsContainer: {
          paddingTop: 28,
          paddingBottom: 24,
          paddingHorizontal: 20,
        },
        DataPoint: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: GRAY_800,
          borderWidth: 1,
          borderColor: PURPLE_500,
          left: 1,
          top: -2,
        },
        DataLabelContainer: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
        },
        DataLabelDate: {
          backgroundColor: GRAY_700,
          height: 20,
          borderRadius: 8,
          paddingHorizontal: 4,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 2,
          marginTop: 8,
        },

        PriceContainer: {
          paddingHorizontal: 20,
          paddingTop: 28,
          paddingBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        PriceTitleContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        PriceTitle: {marginRight: 4, marginTop: 2},
        PriceMoreButton: {
          height: 36,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#393939',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12,
        },
        ItemInfoContainer: {paddingTop: 28, paddingHorizontal: 20},
        ItemInfoTable: {
          marginVertical: 24,
          borderTopColor: GRAY_700,
          borderTopWidth: 1,
        },
        ItemInfoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 38,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderBottomColor: GRAY_700,
          borderLeftColor: GRAY_700,
        },
        ItemInfoCell1: {
          width: 72,
          height: 38,
          paddingHorizontal: 4,
          flexDirection: 'row',
          alignItems: 'center',
          borderRightWidth: 1,
          borderRightColor: GRAY_700,
        },
        ItemInfoCell2: {
          paddingHorizontal: 16,
          height: 38,
          flexDirection: 'row',
          alignItems: 'center',
          borderRightWidth: 1,
          flex: 1,
          borderWidth: 0,
          borderColor: GRAY_700,
        },
      });
    },
    [width, insets],
  );
}
