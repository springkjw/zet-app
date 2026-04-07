/**
 * @description 온보딩 쇼핑몰 폼 컴포넌트. 해당 폼에서 사용자가 정보를 확인할 쇼핑몰 선택
 * @author 권재원
 * @since 2025-11-07
 */
import { View, useWindowDimensions } from "react-native";

import { CircleImageCheckbox } from "@/components/Checkbox";
import { BaseText } from "@/components/Text";
import { useShops } from "@/services";
import { useShopStore } from "@/stores";
import useStyle from "./style";

import type IOnboardingShopFormProps from "./type";

const ITEM_WIDTH = 60;
const MIN_GAP = 16;
const HORIZONTAL_PADDING = 20;

export default function OnboardingShopForm({
  nickname,
}: IOnboardingShopFormProps) {
  const { width } = useWindowDimensions();
  const style = useStyle();
  const { data, isLoading } = useShops();
  const selectedShopIds = useShopStore(
    (state) => state.onboarding.selectedShopIds
  );
  const toggleShop = useShopStore((state) => state.toggleOnboardingShop);

  const availableWidth = width - HORIZONTAL_PADDING * 2;
  const itemsPerRow = Math.floor(
    (availableWidth + MIN_GAP) / (ITEM_WIDTH + MIN_GAP)
  );
  const totalItemWidth = itemsPerRow * ITEM_WIDTH;
  const totalGapSpace = availableWidth - totalItemWidth;
  const gap = Math.max(totalGapSpace / (itemsPerRow - 1), MIN_GAP);

  return (
    <View style={style.OnboardingShopFormContainer}>
      <View style={style.OnboardingShopFormTitleContainer}>
        {nickname && (
          <BaseText style={style.OnboardingShopFormTitle}>
            {nickname}님,
          </BaseText>
        )}
        <BaseText style={style.OnboardingShopFormTitle}>
          어떤 쇼핑몰에서{"\n"}가격을 탐지할까요?
        </BaseText>
      </View>

      <View style={style.OnboardingShopFormShopContainer}>
        {isLoading && <BaseText>로딩 중...</BaseText>}
        {data?.shops?.map((shop, index) => (
          <CircleImageCheckbox
            key={shop.id}
            image={shop.image}
            name={shop.name}
            checked={selectedShopIds.includes(shop.id)}
            onPress={() => toggleShop(shop.id)}
            style={{
              marginRight: (index + 1) % itemsPerRow === 0 ? 0 : gap,
              marginBottom: 16,
            }}
          />
        ))}
      </View>
    </View>
  );
}
