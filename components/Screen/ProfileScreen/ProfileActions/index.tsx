import { View } from "react-native";

import { colors } from "@/assets";
import { BaseButton } from "@/components/Button";
import { BaseText } from "@/components/Text";

import useStyle from "./style";

interface IProfileActionsProps {
  onLogout: () => void;
}

export default function ProfileActions({ onLogout }: IProfileActionsProps) {
  const style = useStyle();

  return (
    <View style={style.ProfileActions}>
      <BaseButton variant="warning" size="medium" onPress={onLogout}>
        <BaseText weight="semibold" color={colors.GRAY[900]}>
          로그아웃
        </BaseText>
      </BaseButton>
    </View>
  );
}
