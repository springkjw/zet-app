import { useRouter } from "expo-router";

import { colors } from "@/assets";
import { ConfirmModal, PermissionModal } from "@/components/Modal";
import { BaseText } from "@/components/Text";
import { requestNotificationPermission, useModal } from "@/hooks";
import { useAuthStore } from "@/stores";

import type INotificationConfirmModalProps from "./type";

export default function NotificationConfirmModal({
  isConfirm,
  onConfirm,
}: INotificationConfirmModalProps) {
  const router = useRouter();
  const { setOnboarding } = useAuthStore();
  const {
    isConfirm: isPermissionModalVisible,
    onConfirm: setPermissionModalVisible,
  } = useModal();

  return (
    <>
      <ConfirmModal
        cancelLabel="괜찮아요"
        confirmLabel="알림 받기"
        isConfirm={isConfirm}
        onChange={async (value) => {
          if (value) {
            const granted = await requestNotificationPermission();
            if (granted) {
              onConfirm?.(false);
              setOnboarding({ hasAgreedToTerms: true });
              router.push("/(auth)/onboard");
            } else {
              onConfirm?.(false);
              setPermissionModalVisible(true);
            }
          } else {
            onConfirm?.(false);
            setOnboarding({ hasAgreedToTerms: true });
            router.push("/(auth)/onboard");
          }
        }}
      >
        <BaseText size={16} weight="semibold" color={colors.COMMON[100]}>
          최저가 정보를 놓치지 않고 받아보려면{`\n`}알림 수신 동의가 필요해요.
        </BaseText>
      </ConfirmModal>

      <PermissionModal
        isVisible={isPermissionModalVisible}
        onClose={() => setPermissionModalVisible(false)}
      >
        <BaseText size={16} weight="semibold" color={colors.COMMON[100]}>
          알림 권한이 거부되어 있어요.{`\n`}설정에서 알림을 허용해주세요.
        </BaseText>
      </PermissionModal>
    </>
  );
}
