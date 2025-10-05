import { TouchableOpacity, View } from "react-native";

import { ChevronDownIcon, colors } from "@/assets";
import { FilterChip } from "@/components/Chip";
import { BaseText } from "@/components/Text";
import { homeFilterData } from "./data";
import useStyle from "./style";

export default function HomeFilter() {
  const style = useStyle();

  return (
    <View style={style.HomeFilter}>
      <View style={style.HomeFilterHeaderContainer}>
        <BaseText size={18} color={colors.COMMON[100]}>
          최저가 탐색·알림 필터
        </BaseText>

        <TouchableOpacity style={style.HomeFilterHeaderButton}>
          <ChevronDownIcon size={20} color={colors.GRAY[600]} />
        </TouchableOpacity>
      </View>

      <View style={style.HomeFilterContainer}>
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

              <View>
                {(item.options || []).map((option, optionIndex) => (
                  <FilterChip
                    key={`home-filter-${index}-${item.label}-${optionIndex}-${option.value}`}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
