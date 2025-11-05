import type { ReactNode } from "react";

export interface IBaseModalButton {
  label: string;
  variant: "primary" | "secondary" | "warning" | "danger";
  onPress: () => void;
}

export default interface IBaseModalProps {
  children?: ReactNode;
  isVisible?: boolean;
  buttons?: IBaseModalButton[];
  enableBackdropDismiss?: boolean;
  onClose?: () => void;
}
