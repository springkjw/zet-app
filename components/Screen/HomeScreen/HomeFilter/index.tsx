import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ChevronDownIcon, colors } from "@/assets";
import { FilterChip } from "@/components/Chip";
import { BaseText } from "@/components/Text";
import { homeFilterData } from "./data";
import useStyle from "./style";

export default function HomeFilter() {
  const style = useStyle();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const animatedHeight = useSharedValue(1);
  const animatedRotation = useSharedValue(0);

  const toggleAccordion = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);

    animatedHeight.value = withTiming(newExpandedState ? 1 : 0, {
      duration: 300,
    });

    animatedRotation.value = withTiming(newExpandedState ? 0 : 1, {
      duration: 300,
    });
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    const itemCount = homeFilterData.length;
    return {
      height:
        animatedHeight.value === 0
          ? 0
          : itemCount * 26 + (itemCount - 1) * 14 + 20,
      opacity: animatedHeight.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${animatedRotation.value * 180}deg`,
        },
      ],
    };
  });

  return (
    <View style={style.HomeFilter}>
      <View style={style.HomeFilterHeaderContainer}>
        <BaseText size={18} color={colors.COMMON[100]}>
          최저가 탐색·알림 필터
        </BaseText>

        <TouchableOpacity
          style={style.HomeFilterHeaderButton}
          onPress={toggleAccordion}
        >
          <Animated.View style={animatedIconStyle}>
            <ChevronDownIcon size={20} color={colors.GRAY[600]} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[style.HomeFilterContainer, animatedContainerStyle]}
      >
        {homeFilterData.map((item, index) => {
          return (
            <View
              key={`home-filter-${index}-${item.label}`}
              style={style.HomeFilterItem}
            >
              <BaseText
                size={14}
                color={colors.GRAY[500]}
                style={style.HomeFilterItemLabel}
              >
                {item.label}
              </BaseText>

              <View style={style.HomeFilterItemLabelContainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={item.options}
                  ItemSeparatorComponent={() => (
                    <View style={style.HomeFilterItemSeparator} />
                  )}
                  contentContainerStyle={style.HomeFilterListContainer}
                  renderItem={({ item: option, index: optionIndex }) => (
                    <FilterChip
                      key={`home-filter-${index}-${item.label}-${optionIndex}-${option.value}`}
                      label={option.label}
                      value={option.value}
                    />
                  )}
                />
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}
