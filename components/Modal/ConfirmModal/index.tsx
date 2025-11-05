import { useMemo } from "react";

import BaseModal from "@/components/Modal/BaseModal";

import type IConfirmModalProps from "./type";

export default function ConfirmModal({
  children,
  isConfirm = false,
  cancelLabel = "취소",
  confirmLabel = "확인",
  onChange,
}: IConfirmModalProps) {
  const buttons = useMemo(
    () => [
      {
        label: cancelLabel,
        variant: "warning" as const,
        onPress: () => onChange?.(false),
      },
      {
        label: confirmLabel,
        variant: "primary" as const,
        onPress: () => onChange?.(true),
      },
    ],
    [cancelLabel, confirmLabel, onChange]
  );

  return (
    <BaseModal isVisible={isConfirm} buttons={buttons}>
      {children}
    </BaseModal>
  );
}
