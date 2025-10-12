import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { StartImage, colors } from "@/assets";
import { BaseButton, BaseText, ConfirmModal } from "@/components";
import {
  useBaseStyle,
  useModal,
  useSafeAreaInsets,
  useWindowDimensions,
} from "@/hooks";
import { useAuthStore } from "@/stores";

export default function StartScreen() {
  const { padding, flex, margin, font, size } = useBaseStyle();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const router = useRouter();
  const { setOnboarding } = useAuthStore();
  const { isConfirm, onConfirm } = useModal();

  // const handleStart = async () => {
  //   await setOnboarding({ hasAgreedToTerms: true });
  //   router.push("/(auth)/onboard");
  // };

  return (
    <View
      style={{
        ...flex({ justify: "center", align: "center", flex: 1 }),
        ...padding({ top: 40, bottom: bottom + 28 }),
      }}
    >
      <Image
        source={StartImage}
        contentFit="contain"
        style={{
          width,
          height: (width * 470) / 360,
        }}
      />

      <View
        style={{
          ...flex({ flex: 1 }),
          ...padding({ top: 40 }),
        }}
      >
        <BaseText
          size={20}
          weight="semibold"
          color={colors.RED[50]}
          style={{ ...margin({ bottom: 24 }) }}
        >
          다른{" "}
          <BaseText size={20} weight="semibold" color={colors.RED[500]}>
            쓸모없는 알림
          </BaseText>
          말고{`\n`}
          <BaseText size={20} weight="semibold" color={colors.RED[500]}>
            오직 제로음료
          </BaseText>
          에 관해서만
        </BaseText>

        <View
          style={{
            ...flex({ justify: "center", align: "center" }),
            ...size({ height: 40 }),
          }}
        >
          <BaseText
            size={12}
            style={{ ...font({ color: colors.GRAY[500], height: 20 }) }}
          >
            서비스 시작 시{" "}
            <TouchableOpacity style={{ ...size({ height: 14 }) }}>
              <BaseText
                size={12}
                style={{
                  ...font({ color: colors.GRAY[500], decoration: "underline" }),
                }}
              >
                이용약관
              </BaseText>
            </TouchableOpacity>{" "}
            및{" "}
            <TouchableOpacity style={{ ...size({ height: 14 }) }}>
              <BaseText
                size={12}
                style={{
                  ...font({
                    color: colors.GRAY[500],
                    decoration: "underline",
                  }),
                }}
              >
                개인정보처리방침
              </BaseText>
            </TouchableOpacity>{" "}
            에 동의 처리됩니다.
          </BaseText>
        </View>

        <View>
          <BaseButton
            label="ZET와 최저가 탐색 시작하기"
            style={{ ...size({ width: width - 36, height: 62 }) }}
            labelStyle={{ ...font({ color: colors.COMMON[100], size: 18 }) }}
            onPress={() => onConfirm(true)}
          />
        </View>
      </View>

      <ConfirmModal
        cancelLabel="괜찮아요"
        confirmLabel="알림받기"
        isConfirm={isConfirm}
        onChange={(value) => {
          onConfirm(value);
        }}
      >
        <BaseText size={16} weight="semibold" color={colors.COMMON[100]}>
          최저가 정보를 놓치지 않고 받아보려면{`\n`}알림 수신 동의가 필요해요.
        </BaseText>
      </ConfirmModal>
    </View>
  );
}
