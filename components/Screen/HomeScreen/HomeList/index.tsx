import { FlatList, View } from "react-native";

import HomeItem from "@/components/Screen/HomeScreen/HomeItem";
import useStyle from "./style";

export default function HomeList() {
  const style = useStyle();

  return (
    <View style={style.HomeList}>
      <FlatList
        data={[1, 2]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <HomeItem />}
      />
    </View>
  );
}
