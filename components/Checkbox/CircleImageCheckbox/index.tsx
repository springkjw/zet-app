import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

import { BaseText } from "@/components/Text";

import type ICircleImageCheckboxProps from "./type";

export default function CircleImageCheckbox({
  image,
  name,
  checked,
}: ICircleImageCheckboxProps) {
  return (
    <TouchableOpacity>
      <Image source={{ uri: image }} />
      <BaseText>{name}</BaseText>
    </TouchableOpacity>
  );
}
