import { Path, Svg } from "react-native-svg";

import { colors } from "@/assets/style";

import type { IIconProps } from "./type";

export default function ChevronRight({
  size = 20,
  color = colors.COMMON[100],
}: IIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M10.9687 5.1335C10.1225 5.97964 10.1225 7.35149 10.9687 8.19762L22.7699 19.9989L10.9687 31.8001C10.1225 32.6462 10.1225 34.0181 10.9687 34.8642C11.8148 35.7103 13.1867 35.7103 14.0328 34.8642L27.3661 21.5309C28.2122 20.6848 28.2122 19.3129 27.3661 18.4668L14.0328 5.1335C13.1867 4.28737 11.8148 4.28737 10.9687 5.1335Z"
        fill={color}
      />
    </Svg>
  );
}
