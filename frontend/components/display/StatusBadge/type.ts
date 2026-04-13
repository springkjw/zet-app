import type { StatusBadgeType } from "@/types";
import type { StyleProp, ViewStyle } from "react-native";

export default interface IStatusBadgeProps {
  type?: StatusBadgeType;
  style?: StyleProp<ViewStyle>;
}
