/**
 * 로그아웃 모달 컴포넌트
 */
import { useRouter } from "expo-router";
import { View } from "react-native";

import { colors } from "@/assets";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { BaseText } from "@/components/Text";
import { useAuthStore } from "@/stores";
import useStyle from "./style";
import type ILogoutModalProps from "./type";

export default function LogoutModal({
  isConfirm,
  onConfirm,
}: ILogoutModalProps) {
  const style = useStyle();
  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <ConfirmModal
      confirmLabel="로그아웃"
      isConfirm={isConfirm}
      onChange={async (value) => {
        onConfirm?.(false);

        if (value) {
          await logout();
          router.dismissAll();
          router.replace("/(auth)/login");
        }
      }}
    >
      <View style={style.LogoutModalContainer}>
        <BaseText size={16} weight="semibold" color={colors.COMMON[100]}>
          로그아웃 하시겠습니까?
        </BaseText>
      </View>
    </ConfirmModal>
  );
}
