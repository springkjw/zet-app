import type { ReactNode } from "react";

export default interface IConfirmModalProps {
  children?: ReactNode;
  isConfirm?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  onChange?: (value: boolean) => void;
}
