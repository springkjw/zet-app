import { TouchableOpacity, View } from "react-native";

import { BaseText } from "@/components/Text";

export default function LoginAction() {
  return (
    <View>
      <View>
        <BaseText>ZET와 함께 최저가 탐색 시작해요</BaseText>
      </View>
      <View>
        <TouchableOpacity>
          <BaseText>비회원으로 둘러보기</BaseText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
