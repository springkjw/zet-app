import { Image } from "expo-image";
import { View } from "react-native";

import { ItemChip } from "@/components/Chip";
import { BaseText } from "@/components/Text";
import { ItemChipType } from "@/types";
import useStyle from "./style";

import type IHomeItemProps from "./type";

export default function HomeItem({ shop }: IHomeItemProps) {
  const style = useStyle();

  return (
    <View style={style.HomeItem}>
      <View style={style.HomeItemContent}>
        <Image style={style.HomeItemImage} source={{ uri: shop?.image }} />
        <View>
          <ItemChip type={ItemChipType.ZET_PICK} style={style.HomeItemChip} />
          <BaseText style={style.HomeItemTitle}>
            {shop?.name || "펩시 제로 355ml 24개"}
          </BaseText>

          <View style={style.HomeItemPriceContainer}>
            <BaseText weight="semibold" style={style.HomeItemDiscountRateText}>
              24%
            </BaseText>
            <BaseText weight="semibold" style={style.HomeItemPriceText}>
              16,000원
            </BaseText>
            <BaseText weight="medium" style={style.HomeItemDeliveryText}>
              배송비 포함
            </BaseText>
          </View>
        </View>
      </View>
      <View />
    </View>
  );
}
