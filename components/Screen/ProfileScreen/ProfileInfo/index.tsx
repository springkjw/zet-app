import { View } from "react-native";

import { colors, UserIcon } from "@/assets";
import { BaseText } from "@/components/Text";

import useStyle from "./style";

interface IProfileInfoProps {
  nickname: string;
}

export default function ProfileInfo({ nickname }: IProfileInfoProps) {
  const style = useStyle();

  return (
    <View style={style.ProfileInfo}>
      <View style={style.ProfileInfoIconContainer}>
        <UserIcon size={48} color={colors.GRAY[400]} />
      </View>
      <BaseText style={style.ProfileInfoNickname} color={colors.COMMON[100]}>
        {nickname}
      </BaseText>
    </View>
  );
}
