import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {RED_600, RED_500} from '@assets';
import {convertToRGBA} from '@utils';

import type {StyleProps} from './type';

export default function useStyle({background, border}: StyleProps) {
  return useMemo(
    function () {
      return StyleSheet.create({
        Container: {
          width: 70,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ImageContainer: {
          width: 70,
          height: 70,
          borderRadius: 35,
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
          fontSize: 16,
          lineHeight: 16 * 1.5,
          letterSpacing: -16 * 0.02,
        },
        Mask: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: convertToRGBA(RED_500, 0.6),
        },
        Image: {
          width: 66,
          height: 66,
          borderRadius: 33,
        },
      });
    },
    [background, border],
  );
}
