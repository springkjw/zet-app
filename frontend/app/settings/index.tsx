import { router } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { colors } from "@/assets";
import { BaseNav } from "@/components/Nav";
import { LogoutModal, SettingMenu } from "@/components/Screen";
import { CONTENT_PADDING, HORIZONTAL_PADDING } from "@/constants";
import { useBaseStyle, useModal } from "@/hooks";

import type { ViewStyle } from "react-native";

export default function SettingsScreen() {
  const { flex, layout, padding, size } = useBaseStyle();
  const { isConfirm, onConfirm } = useModal();

  const menuItems = useMemo(() => {
    return [
      [
        {
          label: "알림",
          onPress: () => router.push("/settings/notification"),
        },
      ],
      [
        {
          label: "피드백 공유",
        },
      ],
      [
        {
          label: "서비스 약관",
        },
        {
          label: "개인정보처리 및 방침",
        },
      ],
      [
        {
          label: "로그아웃",
          onPress: () => onConfirm(true),
        },
      ],
    ];
  }, [router, onConfirm]);

  return (
    <View
      style={{
        ...flex<ViewStyle>({
          flex: 1,
          direction: "column",
          justify: "flex-start",
        }),
        ...layout<ViewStyle>({ color: colors.GRAY[800] }),
      }}
    >
      <BaseNav title="설정" />

      <View
        style={{
          ...padding<ViewStyle>({
            horizontal: HORIZONTAL_PADDING,
            vertical: CONTENT_PADDING,
          }),
          ...size<ViewStyle>({ width: "100%" }),
          ...flex<ViewStyle>({
            direction: "column",
            justify: "flex-start",
            gap: CONTENT_PADDING,
          }),
        }}
      >
        {menuItems.map((group, groupIndex) => (
          <View key={`setting-menu-group-${groupIndex}`}>
            {group.map((item, itemIndex) => (
              <SettingMenu
                key={`setting-menu-${groupIndex}-${itemIndex}`}
                label={item.label}
                hasBorder={itemIndex !== group.length - 1}
                isTop={itemIndex === 0}
                isBottom={itemIndex === group.length - 1}
                onPress={"onPress" in item ? item.onPress : undefined}
              />
            ))}
          </View>
        ))}
      </View>

      <LogoutModal isConfirm={isConfirm} onConfirm={onConfirm} />
    </View>
  );
}
