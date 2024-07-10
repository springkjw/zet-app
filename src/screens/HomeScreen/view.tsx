import {useCallback, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';

import {ChevronDownIcon, GRAY_500, GRAY_600} from '@assets';
import {ShopItem, Text, FilterChip} from '@components';
import useStyle from './style';

import type {HomeViewProps} from './type';

export default function HomeView({data}: HomeViewProps) {
  const style = useStyle();
  const [expand, setExpaned] = useState<boolean>(false);
  const animatedHeight = useSharedValue(0);

  const collapsableStyle = useAnimatedStyle(
    function () {
      animatedHeight.value = expand ? withTiming(222) : withTiming(0);

      return {
        height: animatedHeight.value,
      };
    },
    [expand],
  );

  const rotateStyle = useAnimatedStyle(
    function () {
      return {
        transform: [
          {
            rotate: `${expand ? '180deg' : '0deg'}`,
          },
        ],
      };
    },
    [expand],
  );

  const onExpand = useCallback(function () {
    setExpaned(prev => !prev);
  }, []);

  const renderHeader = useCallback(
    function () {
      return (
        <View style={style.HeaderWrapper}>
          <View style={style.Header}>
            <Text font="SEMI_T18_100">최저가 탐색 조건 설정</Text>

            <TouchableOpacity onPress={onExpand} style={style.HeaderMore}>
              <Animated.View style={rotateStyle}>
                <ChevronDownIcon color={GRAY_600} />
              </Animated.View>
            </TouchableOpacity>
          </View>

          <Animated.View style={[style.HeaderContent, collapsableStyle]}>
            <View style={style.HeaderContentItem}>
              <Text
                style={style.HeaderContentItemTitle}
                font="SEMI_T14_100"
                color={GRAY_500}>
                브랜드
              </Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <FilterChip label="코카콜라" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="펩시" />
                </ScrollView>
              </View>
            </View>

            <View style={style.HeaderContentItem}>
              <Text
                style={style.HeaderContentItemTitle}
                font="SEMI_T14_100"
                color={GRAY_500}>
                용량
              </Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <FilterChip label="190ml" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="210ml" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="315ml" />
                </ScrollView>
              </View>
            </View>

            <View style={style.HeaderContentItem}>
              <Text
                style={style.HeaderContentItemTitle}
                font="SEMI_T14_100"
                color={GRAY_500}>
                쇼핑몰
              </Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <FilterChip label="11번가" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="G마켓" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="쿠팡" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="인터파크" />
                </ScrollView>
              </View>
            </View>

            <View style={style.HeaderContentItem}>
              <Text
                style={style.HeaderContentItemTitle}
                font="SEMI_T14_100"
                color={GRAY_500}>
                할인율
              </Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <FilterChip label="역대 최저가" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="역대 할인가" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="할인가" />
                </ScrollView>
              </View>
            </View>

            <View
              style={[style.HeaderContentItem, style.HeaderContentLastItem]}>
              <Text
                style={style.HeaderContentItemTitle}
                font="SEMI_T14_100"
                color={GRAY_500}>
                카드 혜택
              </Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <FilterChip label="신한" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="국민" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="하나" />
                  <View style={style.FilterSepartor} />
                  <FilterChip label="현대" />
                </ScrollView>
              </View>
            </View>
          </Animated.View>

          <View style={style.HeaderDescriptionContainer}>
            <Text style={style.HeaderDescription}>
              *100ml당 가격이 낮은 순으로 소개해 드려요.
            </Text>
          </View>
        </View>
      );
    },
    [style, onExpand, collapsableStyle],
  );

  const renderSeparator = useCallback(
    function () {
      return <View style={style.Separator} />;
    },
    [style],
  );

  return (
    <View style={style.Wrapper}>
      <FlashList
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={style.ListHeaderComponent}
        contentContainerStyle={style.ListContent}
        data={data}
        keyExtractor={(item, index) => `item-${index}`}
        ItemSeparatorComponent={renderSeparator}
        renderItem={function ({item}) {
          return <ShopItem data={item} />;
        }}
        estimatedItemSize={160}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
