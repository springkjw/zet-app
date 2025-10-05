import { TouchableOpacity } from "react-native";

import { BaseText } from "@/components/Text";

import { useStyle } from "./style";

export default function FilterChip({ label, value }) {
  const innerStyle = useStyle();

  return (
    <TouchableOpacity style={[innerStyle.FilterChip]}>
      <BaseText>{label}</BaseText>
    </TouchableOpacity>
  );
}
