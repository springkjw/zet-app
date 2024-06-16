import type {ReactNode} from 'react';

export type FontType =
  | 'EXTRA_T20_150'
  | 'MEDIUM_T12_100'
  | 'MEDIUM_T12_150'
  | 'MEDIUM_T16_150'
  | 'SEMI_T14_100'
  | 'SEMI_T14_150'
  | 'SEMI_T16_100'
  | 'SEMI_T16_150'
  | 'SEMI_T18_100'
  | 'SEMI_T18_150'
  | 'SEMI_T20_100'
  | 'SEMI_T20_150'
  | 'SEMI_T22_100'
  | 'SEMI_T22_150'
  | 'SEMI_T24_100'
  | 'SEMI_T24_150'
  | 'PRIMARY_BUTTON'
  | 'SECONDARY_BUTTON'
  | 'TERTIARY_BUTTON';

export interface TextProps {
  font?: FontType;
  color?: string;
  children: JSX.Element | ReactNode | string;
  numberOfLines?: number;
  style?: object;
}

export interface TextStyleProps {
  font: FontType;
  color: string;
}

export interface FontStyle {
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
}
