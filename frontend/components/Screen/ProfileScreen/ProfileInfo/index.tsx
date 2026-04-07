/**
 * 프로필 정보 컴포넌트
 */
import { View } from "react-native";

import { colors, UserIcon } from "@/assets";
import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type IProfileInfoProps from "./type";

export default function ProfileInfo({ nickname }: IProfileInfoProps) {
  const style = useStyle();

  return (
    <View style={style.ProfileInfoContainer}>
      <View style={style.ProfileInfoUserContainer}>
        <View style={style.ProfileInfoIconContainer}>
          <UserIcon size={32} color={colors.GRAY[400]} />
        </View>
        <BaseText style={style.ProfileInfoNickname} color={colors.COMMON[100]}>
          {nickname}
        </BaseText>
      </View>
    </View>
  );
}
