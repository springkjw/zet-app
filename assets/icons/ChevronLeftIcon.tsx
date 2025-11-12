import { Path, Svg } from "react-native-svg";

import { colors } from "@/assets/style";

import type { IIconProps } from "./type";

export default function ChevronLeft({
  size = 20,
  color = colors.COMMON[100],
}: IIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M12.5 15L7.5 10L12.5 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
