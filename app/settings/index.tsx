import { useMemo } from "react";
import { View } from "react-native";

import { colors } from "@/assets";
import { BaseNav } from "@/components/Nav";
import { LogoutModal, SettingMenu } from "@/components/Screen";
import { CONTENT_PADDING, HORIZONTAL_PADDING } from "@/constants";
import { useBaseStyle, useModal } from "@/hooks";

export default function SettingsScreen() {
  const { flex, layout, padding, size } = useBaseStyle();
  const { isConfirm, onConfirm } = useModal();

  const menuItems = useMemo(
    () => [
      {
        label: "알림",
      },
      {
        label: "피드백 공유",
      },
      {
        label: "서비스 약관",
      },
      {
        label: "개인정보처리 및 방침",
      },
      {
        label: "로그아웃",
        onPress: () => onConfirm(true),
      },
    ],
    [onConfirm]
  );

  return (
    <View
      style={{
        ...flex({ flex: 1, direction: "column", justify: "flex-start" }),
        ...layout({ color: colors.GRAY[800] }),
      }}
    >
      <BaseNav title="설정" />

      <View
        style={{
          ...padding({
            horizontal: HORIZONTAL_PADDING,
            vertical: CONTENT_PADDING,
          }),
          ...size({ width: "100%" }),
        }}
      >
        {menuItems.map((item, index) => (
          <SettingMenu
            key={`setting-menu-${index}`}
            label={item.label}
            hasBorder={index !== menuItems.length - 1}
            direction={
              index === 0
                ? "top"
                : index === menuItems.length - 1
                ? "bottom"
                : undefined
            }
            onPress={item.onPress}
          />
        ))}
      </View>

      <LogoutModal isConfirm={isConfirm} onConfirm={onConfirm} />
    </View>
  );
}
