import { Text } from "react-native";

import useStyle from "./style";

import type { IBaseTextProps } from "./type";

export default function BaseText({
  children,
  size = 14,
  color,
  weight = "medium",
  style,
}: IBaseTextProps) {
  const innerStyle = useStyle({ size, weight, color });

  return <Text style={[innerStyle.BaseText, style]}>{children}</Text>;
}
