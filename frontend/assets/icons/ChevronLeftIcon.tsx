import { Path, Svg } from "react-native-svg";

import { colors } from "@/assets/style";

import type { IIconProps } from "./type";

export default function ChevronLeft({
  size = 20,
  color = colors.COMMON[100],
}: IIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M27.3661 5.1335C28.2122 5.97964 28.2122 7.35149 27.3661 8.19762L15.5649 19.9989L27.3661 31.8001C28.2122 32.6462 28.2122 34.0181 27.3661 34.8642C26.52 35.7103 25.1481 35.7103 24.302 34.8642L10.9687 21.5309C10.1226 20.6848 10.1226 19.3129 10.9687 18.4668L24.302 5.1335C25.1481 4.28737 26.52 4.28737 27.3661 5.1335Z"
        fill={color}
      />
    </Svg>
  );
}
