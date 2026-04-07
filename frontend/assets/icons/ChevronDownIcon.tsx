import { Path, Svg } from "react-native-svg";

import { colors } from "@/assets/style";

import type { IIconProps } from "./type";

export default function ChevronDown({
  size = 20,
  color = colors.COMMON[100],
}: IIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
