import { useEffect, useState } from "react";
import { View } from "react-native";

import { ProfileHeader, ProfileInfo } from "@/components/Screen/ProfileScreen";
import { HORIZONTAL_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";
import { useAuthStore } from "@/stores";

import type { ViewStyle } from "react-native";

export default function ProfileScreen() {
  const { padding } = useBaseStyle();
  const { user, isGuest, getGuestProfile } = useAuthStore();
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
