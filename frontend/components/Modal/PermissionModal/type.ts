import type { ReactNode } from "react";

export default interface IPermissionModalProps {
  children?: ReactNode;
  isVisible?: boolean;
  buttonLabel?: string;
  onClose?: () => void;
}
