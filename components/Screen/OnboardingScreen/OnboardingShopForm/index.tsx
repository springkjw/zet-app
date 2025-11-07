/**
 * @description 온보딩 쇼핑몰 폼 컴포넌트. 해당 폼에서 사용자가 정보를 확인할 쇼핑몰 선택
 * @author 권재원
 * @since 2025-11-07
 */
import { View } from "react-native";

import { CircleImageCheckbox } from "@/components/Checkbox";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type IOnboardingShopFormProps from "./type";

export default function OnboardingShopForm({
  nickname,
  shops = [],
}: IOnboardingShopFormProps) {
  const style = useStyle();

  return (
    <View style={style.OnboardingShopFormContainer}>
      <View>
        {nickname && (
          <BaseText style={style.OnboardingShopFormTitle}>
            {nickname}님,
          </BaseText>
        )}
        <BaseText style={style.OnboardingShopFormTitle}>
          어떤 쇼핑몰에서{"\n"}가격을 탐지할까요?
        </BaseText>
      </View>

      <View>
        {shops?.length > 0 &&
          shops?.map((shop) => (
            <CircleImageCheckbox
              key={shop.id}
              image={shop.image}
              name={shop.name}
            />
          ))}
      </View>
    </View>
  );
}
