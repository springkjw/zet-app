import { TouchableOpacity, View } from "react-native";

import { BaseButton } from "@/components/Button";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type IStartActionProps from "./type";

export default function StartAction({ onPress }: IStartActionProps) {
  const style = useStyle();

  return (
    <View style={style.StartActionContainer}>
      <View style={style.StartActionAgreeContainer}>
        <BaseText style={style.StartActionAgreeText}>서비스 시작 시</BaseText>
        <TouchableOpacity style={{ height: 20 }}>
          <BaseText style={style.StartActionAgreeTextLink}>이용약관</BaseText>
        </TouchableOpacity>
        <BaseText style={style.StartActionAgreeText}>및</BaseText>
        <TouchableOpacity>
          <BaseText style={style.StartActionAgreeTextLink}>
            개인정보처리방침
          </BaseText>
        </TouchableOpacity>
        <BaseText style={style.StartActionAgreeText}>
          에 동의 처리됩니다.
        </BaseText>
      </View>

      <BaseButton
        label="ZET와 최저가 탐색 시작하기"
        style={style.StartActionButtonContainer}
        labelStyle={style.StartActionButtonLabel}
        onPress={onPress}
      />
    </View>
  );
}
