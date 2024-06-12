import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_700, GRAY_800, GRAY_900, PURPLE_500} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      Wrapper: {
        flex: 1,
        backgroundColor: GRAY_800,
      },
      ScrollContentContainer: {},
      Divider: {
        height: 8,
        backgroundColor: GRAY_900,
        marginTop: 24,
      },
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
      },
      PriceTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      PriceTitle: {marginRight: 4, marginTop: 2},
    });
  }, []);
}
