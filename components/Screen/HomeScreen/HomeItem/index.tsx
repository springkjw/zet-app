import { View } from "react-native";

import { BaseText } from "@/components/Text";
import useStyle from "./style";

export default function HomeItem() {
  const style = useStyle();

  return (
    <View style={style.HomeItem}>
      <BaseText style={style.HomeItemTitle}>펩시 제로 355ml 24개</BaseText>
    </View>
  );
}
