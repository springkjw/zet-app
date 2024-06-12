import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {GRAY_700, GRAY_800} from '@assets';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      Wrapper: {
        flex: 1,
        backgroundColor: GRAY_800,
      },
      ScrollContentContainer: {
        paddingHorizontal: 20,
      },
      InfoContainer: {paddingBottom: 24},
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
    });
  }, []);
}
