import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { BellIcon, LogoImage, UserIcon } from "@/assets";
import useStyle from "./style";

export default function HomeNav() {
  const router = useRouter();
  const style = useStyle();

  return (
    <View style={style.HomeNav}>
      <View style={style.HomeNavLogoContainer}>
        <Image
          source={LogoImage}
          contentFit="contain"
          style={style.HomeNavLogo}
        />
      </View>
      <View style={style.HomeNavButtonContainer}>
        <TouchableOpacity style={style.HomeNavButton}>
          <BellIcon size={32} />
        </TouchableOpacity>

        <TouchableOpacity
          style={style.HomeNavButton}
          onPress={() => router.push("/profile")}
        >
          <UserIcon size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
