import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import type {TextStyleProps, FontStyle} from './type';

export default function useStyle({font, color}: TextStyleProps) {
  const fontStyle = useMemo(function () {
    return StyleSheet.create({
      EXTRA_T20_150: {
        fontFamily: 'SUIT-ExtraBold',
        fontSize: 20,
        lineHeight: 20 * 1.5,
        letterSpacing: -20 * 0.02,
      },
      MEDIUM_T12_100: {
        fontFamily: 'SUIT-Medium',
        fontSize: 12,
        lineHeight: 12 * 1,
        letterSpacing: -12 * 0.02,
      },
      MEDIUM_T12_150: {
        fontFamily: 'SUIT-Medium',
        fontSize: 12,
        lineHeight: 12 * 1.5,
        letterSpacing: -12 * 0.02,
      },
      MEDIUM_T16_150: {
        fontFamily: 'SUIT-Medium',
        fontSize: 16,
        lineHeight: 16 * 1.5,
        letterSpacing: -16 * 0.02,
      },
      SEMI_T14_100: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 14,
        lineHeight: 14 * 1,
        letterSpacing: -14 * 0.02,
      },
      SEMI_T14_150: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 14,
        lineHeight: 14 * 1.5,
        letterSpacing: -14 * 0.02,
      },
      SEMI_T16_100: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 16,
        lineHeight: 16 * 1,
        letterSpacing: -16 * 0.02,
      },
      SEMI_T16_150: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 16,
        lineHeight: 16 * 1.5,
        letterSpacing: -16 * 0.02,
      },
      SEMI_T18_100: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 18,
        lineHeight: 18 * 1,
        letterSpacing: -18 * 0.02,
      },
      SEMI_T18_150: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 18,
        lineHeight: 18 * 1.5,
        letterSpacing: -18 * 0.02,
      },
      SEMI_T20_100: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 20,
        lineHeight: 20 * 1,
        letterSpacing: -20 * 0.02,
      },
      SEMI_T20_150: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 20,
        lineHeight: 20 * 1.5,
        letterSpacing: -20 * 0.02,
      },
      SEMI_T22_100: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 22,
        lineHeight: 22 * 1,
        letterSpacing: -22 * 0.02,
      },
      SEMI_T22_150: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 22,
        lineHeight: 22 * 1.5,
        letterSpacing: -22 * 0.02,
      },
      SEMI_T24_100: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 24,
        lineHeight: 24 * 1,
        letterSpacing: -24 * 0.02,
      },
      SEMI_T24_150: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 24,
        lineHeight: 24 * 1.5,
        letterSpacing: -24 * 0.02,
      },
      PRIMARY_BUTTON: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 18,
        lineHeight: 18 * 1.4,
        letterSpacing: -18 * 0.02,
      },
      SECONDARY_BUTTON: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 16,
        lineHeight: 16 * 1.4,
        letterSpacing: -16 * 0.02,
      },
      TERTIARY_BUTTON: {
        fontFamily: 'SUIT-SemiBold',
        fontSize: 14,
        lineHeight: 14 * 1.4,
        letterSpacing: -14 * 0.02,
      },
    });
  }, []);

  const style = useMemo(
    function () {
      const result: FontStyle[] = [{color}];
      if (fontStyle[font]) {
        result.push(fontStyle[font]);
      }
      return result;
    },
    [font, color, fontStyle],
  );

  return StyleSheet.flatten(style);
}
