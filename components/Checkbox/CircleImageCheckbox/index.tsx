import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type { ICircleImageCheckboxProps } from "./type";

export default function CircleImageCheckbox({
  image,
  name,
  checked = false,
  onPress,
  style,
}: ICircleImageCheckboxProps) {
  const innerStyle = useStyle({ checked });

  return (
    <TouchableOpacity
      style={[innerStyle.CircleImageCheckbox, style]}
      onPress={onPress}
    >
      <View style={innerStyle.CircleImageCheckboxImageContainer}>
        {checked && <View style={innerStyle.CircleImageCheckboxMask} />}
        <Image
          style={innerStyle.CircleImageCheckboxImage}
          contentFit="cover"
          source={{ uri: image }}
        />
      </View>
      <BaseText style={innerStyle.CircleImageLabelText}>{name}</BaseText>
    </TouchableOpacity>
  );
}
