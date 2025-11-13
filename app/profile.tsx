import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { colors } from "@/assets";
import {
  ProfileActions,
  ProfileHeader,
  ProfileInfo,
} from "@/components/Screen/ProfileScreen";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

export default function ProfileScreen() {
  const { flex, layout } = useBaseStyle();
  const router = useRouter();
  const { user, isGuest, logout, getGuestProfile } = useAuthStore();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const loadProfile = async () => {
      if (isGuest) {
        const guestProfile = await getGuestProfile();
        if (guestProfile) {
          setNickname(guestProfile.nickname);
        }
      } else if (user) {
        setNickname(user.nickname);
      }
    };

    loadProfile();
  }, [isGuest, user, getGuestProfile]);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <View
      style={{
        ...flex({ flex: 1, direction: "column", justify: "flex-start" }),
        ...layout({ color: colors.GRAY[800] }),
      }}
    >
      <ProfileHeader />
      <ProfileInfo nickname={nickname} />
      <ProfileActions onLogout={handleLogout} />
    </View>
  );
}
