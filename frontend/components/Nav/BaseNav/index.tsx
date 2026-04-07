import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { ChevronLeftIcon } from "@/assets";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type IBaseNavProps from "./type";

export default function BaseNav({ title, children }: IBaseNavProps) {
  const router = useRouter();
  const style = useStyle();

  return (
    <View style={style.BaseNavContainer}>
      <TouchableOpacity
        style={style.BaseNavBackButton}
        onPress={() => router.back()}
      >
        <ChevronLeftIcon size={20} />
      </TouchableOpacity>
      {title && (
        <View style={style.BaseNavContent}>
          {title && <BaseText style={style.BaseNavTitle}>{title}</BaseText>}
        </View>
      )}

      <View style={style.BaseNavRightContent}>{children}</View>
    </View>
  );
}
