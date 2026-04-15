import { useEffect, useState } from "react";
import { View } from "react-native";

import { ProfileHeader, ProfileInfo } from "@/components";
import { HORIZONTAL_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

import type { ViewStyle } from "react-native";

export default function ProfileScreen() {
  const { padding } = useBaseStyle();
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    setNickname(user?.nickname ?? "");
  }, [user]);

  return (
    <View>
      <ProfileHeader />
      <View
        style={{ ...padding<ViewStyle>({ horizontal: HORIZONTAL_PADDING }) }}
      >
        <ProfileInfo nickname={nickname} />
      </View>
    </View>
  );
}
