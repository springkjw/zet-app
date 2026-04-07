/**
 * 프로필 헤더 컴포넌트
 * 프로필 헤더는 프로필 화면의 상단에 위치하며, 프로필 정보를 표시합니다.
 * 프로필 헤더에는 설정 버튼이 있으며, 설정 버튼을 클릭하면 설정 화면으로 이동합니다.
 */
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import { GearIcon } from "@/assets";
import { BaseNav } from "@/components";
import useStyle from "./style";

export default function ProfileHeader() {
  const router = useRouter();
  const style = useStyle();

  return (
    <BaseNav title="내 정보">
      <TouchableOpacity
        style={style.SettingsButton}
        onPress={() => router.push("/settings")}
      >
        <GearIcon size={24} />
      </TouchableOpacity>
    </BaseNav>
  );
}
