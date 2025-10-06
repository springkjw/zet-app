import { FlatList, View } from "react-native";

import HomeItem from "@/components/Screen/HomeScreen/HomeItem";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

export default function HomeList() {
  const style = useStyle();

  return (
    <View style={style.HomeList}>
      <FlatList
        data={[1, 2]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <HomeItem />}
        contentContainerStyle={style.HomeListContentContainer}
        ItemSeparatorComponent={() => <View style={style.HomeListSeparator} />}
        ListHeaderComponent={() => (
          <View style={style.HomeListHeader}>
            <BaseText style={style.HomeListHeaderText}>
              100ml당 가격이 낮은 순으로 소개해 드려요.
            </BaseText>
          </View>
        )}
      />
    </View>
  );
}
