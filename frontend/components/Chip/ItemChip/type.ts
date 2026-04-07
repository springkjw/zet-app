import type { ItemChipType } from "@/types";
import type { StyleProp, ViewStyle } from "react-native";

export default interface IItemChipProps {
  type?: ItemChipType;
  style?: StyleProp<ViewStyle>;
}
