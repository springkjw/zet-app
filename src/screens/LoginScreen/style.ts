import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GRAY_800, WHITE} from '@assets';

export default function useStyle() {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return useMemo(
    function () {
      return StyleSheet.create({
        Container: {
          backgroundColor: GRAY_800,
          flex: 1,
          paddingHorizontal: 20,
        },
        HeaderContainer: {
          paddingTop: insets.top,
          height: 68 + insets.top,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        StepOneContainer: {
          flex: 1,
          justifyContent: 'center',
        },
        NicknameContainer: {
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 12,
        },
        Input: {
          height: 36,
          minWidth: 210,
          maxWidth: width - 40 - 20,
          borderBottomColor: WHITE,
          borderBottomWidth: 1,
          color: WHITE,
          fontSize: 24,
          lineHeight: 24,
          letterSpacing: -24 * 0.02,
          fontFamily: 'NotoSansKR-SemiBold',
          marginRight: 8,
        },
        InputLabel: {marginBottom: 4},
        Description: {marginTop: 24},
        ButtonContainer: {},
        StepTwoContainer: {flex: 1},
        StepTwoDescription: {paddingTop: 24, paddingBottom: 40},
        BrandContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginHorizontal: -9,
        },
        BrandItem: {
          marginHorizontal: 9,
          marginBottom: 20,
        },
      });
    },
    [width, insets],
  );
}
