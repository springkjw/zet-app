import { useCallback, useMemo } from "react";
import { Linking } from "react-native";

import BaseModal from "@/components/Modal/BaseModal";

import type IPermissionModalProps from "./type";

export default function PermissionModal({
  children,
  isVisible = false,
  buttonLabel = "설정으로 이동",
  onClose,
}: IPermissionModalProps) {
  const handleNavigateToSettings = useCallback(() => {
    Linking.openSettings();
    onClose?.();
  }, [onClose]);

  const buttons = useMemo(
    () => [
      {
        label: buttonLabel,
        variant: "primary" as const,
        onPress: handleNavigateToSettings,
      },
    ],
    [buttonLabel, handleNavigateToSettings]
  );

  return (
    <BaseModal
      isVisible={isVisible}
      buttons={buttons}
      enableBackdropDismiss={true}
      onClose={onClose}
    >
      {children}
    </BaseModal>
  );
}
