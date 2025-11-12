import { useMemo } from "react";
import { FlatList, View } from "react-native";

import HomeItem from "@/components/Screen/HomeScreen/HomeItem";
import { BaseText } from "@/components/Text";
import { useShops } from "@/services";
import { useAuthStore } from "@/stores";
import useStyle from "./style";

export default function HomeList() {
  const style = useStyle();
  const { data: shopsData, isLoading } = useShops();
  const user = useAuthStore((state) => state.user);

  const filteredShops = useMemo(() => {
    if (!shopsData?.shops) return [];
    if (!user?.preferredShopIds || user.preferredShopIds.length === 0) {
      return shopsData.shops;
    }
    return shopsData.shops.filter((shop) =>
      user.preferredShopIds?.includes(shop.id)
    );
  }, [shopsData, user?.preferredShopIds]);

  return (
    <View style={style.HomeList}>
      <FlatList
        data={filteredShops}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <HomeItem shop={item} />}
        contentContainerStyle={style.HomeListContentContainer}
        ItemSeparatorComponent={() => <View style={style.HomeListSeparator} />}
        ListHeaderComponent={() => (
          <View style={style.HomeListHeader}>
            <BaseText style={style.HomeListHeaderText}>
              {user?.preferredShopIds && user.preferredShopIds.length > 0
                ? "선택한 쇼핑몰의 상품을 소개해 드려요."
                : "100ml당 가격이 낮은 순으로 소개해 드려요."}
            </BaseText>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={style.HomeListHeader}>
            <BaseText style={style.HomeListHeaderText}>
              {isLoading ? "로딩 중..." : "선택한 쇼핑몰이 없습니다."}
            </BaseText>
          </View>
        )}
      />
    </View>
  );
}
