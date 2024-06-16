import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      PriceItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#262626',
        borderRadius: 8,
        marginHorizontal: 20,
        padding: 12,
      },
      PriceItemBrandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      PriceItemPriceText: {marginLeft: 14},
      PriceItemPriceInfoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
      },
      PriceItemPriceCardText: {
        marginBottom: 4,
      },
    });
  }, []);
}
