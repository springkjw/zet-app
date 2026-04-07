import { StyleSheet } from "react-native";

import { colors } from "@/assets";
import { BORDER_RADIUS, CONTENT_PADDING } from "@/constants";
import { useBaseStyle, useWindowDimensions } from "@/hooks";

import type { ImageStyle, ViewStyle } from "react-native";

export default function useStyle() {
  const { width } = useWindowDimensions();
  const { size, layout, border, font, padding, flex, margin } = useBaseStyle();

  return StyleSheet.create({
    HomeItem: {
      ...border({ radius: BORDER_RADIUS }),
      ...size({ width: width - 40, minHeight: 100 }),
      ...layout({ color: colors.GRAY[700] }),
    },
    HomeItemContent: {
      ...padding({
        horizontal: CONTENT_PADDING,
        vertical: CONTENT_PADDING,
      }),
      ...flex({
        direction: "row",
        justify: "flex-start",
        align: "flex-start",
        gap: 12,
      }),
    },
    HomeItemImage: {
      ...size<ImageStyle>({ width: 72, height: 72 }),
      ...border<ImageStyle>({ radius: 4 }),
      ...layout<ImageStyle>({ color: colors.GRAY[600] }),
    },
    HomeItemChip: {
      ...margin({ bottom: 8 }),
    },
    HomeItemTitle: {
      ...font({
        color: colors.COMMON[100],
        size: 14,
      }),
    },
    HomeItemPriceContainer: {
      ...flex({
        direction: "row",
        justify: "flex-start",
        align: "center",
        gap: 4,
      }),
    },
    HomeItemDiscountRateText: {
      ...font({
        color: colors.RED[500],
        size: 16,
      }),
    },
    HomeItemPriceText: {
      ...font({
        color: colors.COMMON[100],
        size: 16,
      }),
    },
    HomeItemDeliveryText: {
      ...font({
        color: colors.RED[100],
        size: 10,
      }),
    },
  });
}
