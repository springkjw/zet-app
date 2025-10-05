import { Path, Svg } from "react-native-svg";

import { colors } from "@/assets/style";

import type { IIconProps } from "./type";

export default function BellIcon({
  size = 32,
  color = colors.COMMON[100],
}: IIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M22 12C22 10.4087 21.3679 8.88258 20.2426 7.75736C19.1174 6.63214 17.5913 6 16 6C14.4087 6 12.8826 6.63214 11.7574 7.75736C10.6321 8.88258 10 10.4087 10 12C10 19 7 21 7 21H25C25 21 22 19 22 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 25C17.7968 25.3042 17.505 25.5566 17.154 25.7321C16.803 25.9076 16.4051 26 16 26C15.5949 26 15.197 25.9076 14.846 25.7321C14.495 25.5566 14.2032 25.3042 14 25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
