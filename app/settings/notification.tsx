import { useMemo, useState } from "react";
import { View } from "react-native";

import { colors } from "@/assets";
import { BaseMenu } from "@/components/Menu";
import { BaseNav } from "@/components/Nav";
import { BaseToggle } from "@/components/Toggle";
import { CONTENT_PADDING, HORIZONTAL_PADDING } from "@/constants";
import { useBaseStyle } from "@/hooks";

import type { ViewStyle } from "react-native";

export default function NotificationSettingScreen() {
  const { flex, layout, padding, size } = useBaseStyle();

  const [newStockNotification, setNewStockNotification] = useState(true);
  const [newShopNotification, setNewShopNotification] = useState(true);

  const menuItems = useMemo(() => {
    return [
      [
        {
          label: "새 입고 알림",
          value: newStockNotification,
          onValueChange: setNewStockNotification,
        },
        {
          label: "신규 쇼핑몰 알림",
          value: newShopNotification,
          onValueChange: setNewShopNotification,
        },
      ],
    ];
  }, [newStockNotification, newShopNotification]);

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
      <BaseNav title="알림 설정" />

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
          <View key={`notification-menu-group-${groupIndex}`}>
            {group.map((item, itemIndex) => (
              <BaseMenu
                key={`notification-menu-${groupIndex}-${itemIndex}`}
                label={item.label}
                hasBorder={itemIndex !== group.length - 1}
                isTop={itemIndex === 0}
                isBottom={itemIndex === group.length - 1}
              >
                <BaseToggle
                  value={item.value}
                  onValueChange={item.onValueChange}
                  size="medium"
                />
              </BaseMenu>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
