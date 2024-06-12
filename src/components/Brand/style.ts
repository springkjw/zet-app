import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {RED_600, RED_500} from '@assets';
import {convertToRGBA} from '@utils';

import type {StyleProps} from './type';

export default function useStyle({background, border, size}: StyleProps) {
  return useMemo(
    function () {
      return StyleSheet.create({
        Container: {
          width: size,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ImageContainer: {
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: background ? background : '#2C2C2C',
          borderWidth: 2,
          borderColor: border ? border : '#393939',
          marginBottom: 4,
        },
        ImageActiveContainer: {
          borderWidth: 2,
          borderColor: RED_600,
        },
        AllText: {
          color: '#FF4343',
          fontFamily: 'SUIT-Heavy',
          fontSize: size * (16 / 70),
          lineHeight: size * (16 / 70) * 1.5,
          letterSpacing: -size * (16 / 70) * 0.02,
        },
        Mask: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: convertToRGBA(RED_500, 0.6),
        },
        Image: {
          width: size * (66 / 70),
          height: size * (66 / 70),
          borderRadius: size * (66 / 70) * 0.5,
        },
      });
    },
    [background, border, size],
  );
}
