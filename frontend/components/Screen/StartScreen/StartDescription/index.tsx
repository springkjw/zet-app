/**
 * 제트 시작하기 설명 컴포넌트
 */
import { View } from "react-native";

import { colors } from "@/assets";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

export default function StartDescription() {
  const style = useStyle();

  return (
    <View style={style.StartDescriptionContainer}>
      <BaseText
        size={20}
        weight="semibold"
        color={colors.RED[50]}
        style={style.StartDescriptionText}
      >
        다른{" "}
        <BaseText size={20} weight="semibold" color={colors.RED[500]}>
          쓸모없는 알림
        </BaseText>
        말고{`\n`}
        <BaseText size={20} weight="semibold" color={colors.RED[500]}>
          오직 제로음료
        </BaseText>
        에 관해서만
      </BaseText>
    </View>
  );
}
