import { View } from "react-native";

import { colors } from "@/assets";
import { HomeFilter, HomeList, HomeNav } from "@/components";
import { useBaseStyle } from "@/hooks";

export default function HomeScreen() {
  const { size, layout } = useBaseStyle();

  return (
    <>
      <HomeNav />
      <HomeFilter />
      <View
        style={{
          ...size({ height: 8 }),
          ...layout({ color: colors.GRAY[900] }),
        }}
      />
      <HomeList />
    </>
  );
}
