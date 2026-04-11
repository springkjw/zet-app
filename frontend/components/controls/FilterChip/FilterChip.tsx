import { TouchableOpacity } from "react-native";

import { BaseText } from "@/components";
import { useStyle } from "./style";

import type IFilterChipProps from "./type";

export default function FilterChip({ label }: IFilterChipProps) {
  const innerStyle = useStyle();

  return (
    <TouchableOpacity style={[innerStyle.FilterChip]}>
      <BaseText style={innerStyle.FilterChipText}>{label}</BaseText>
    </TouchableOpacity>
  );
}
