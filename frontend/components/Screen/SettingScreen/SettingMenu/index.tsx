/**
 * 설정 메뉴 컴포넌트
 */
import { ChevronRightIcon, colors } from "@/assets";
import { BaseMenu } from "@/components/Menu";

import type ISettingMenuProps from "./type";

export default function SettingMenu({
  label,
  isTop = false,
  isBottom = false,
  hasBorder = false,
  onPress,
}: ISettingMenuProps) {
  return (
    <BaseMenu
      label={label}
      isTop={isTop}
      isBottom={isBottom}
      hasBorder={hasBorder}
      onPress={onPress}
    >
      <ChevronRightIcon size={18} color={colors.GRAY[500]} />
    </BaseMenu>
  );
}
