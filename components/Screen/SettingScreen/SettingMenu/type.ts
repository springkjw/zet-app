import type { TDirection } from "@/types";

export default interface ISettingMenuProps {
  label?: string;
  direction?: TDirection;
  hasBorder?: boolean;
  onPress?: () => void;
}
