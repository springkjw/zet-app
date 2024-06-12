import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export default function useStyle() {
  return useMemo(function () {
    return StyleSheet.create({
      PriceItemContainer: {},
      PriceItemPriceText: {},
      PriceItemPriceInfoContainer: {},
      PriceItemPriceCardText: {},
    });
  }, []);
}
