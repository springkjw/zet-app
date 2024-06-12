import {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';

import {ChevronDownIcon} from '@assets';
import {ShopItem} from '@components';
import useStyle from './style';

import type {HomeViewProps} from './type';

export default function HomeView({data}: HomeViewProps) {
  const style = useStyle();
  const [expand, setExpaned] = useState<boolean>(false);
  const animatedHeight = useSharedValue(0);

  const collapsableStyle = useAnimatedStyle(
    function () {
      animatedHeight.value = expand ? withTiming(212) : withTiming(0);

      return {
        height: animatedHeight.value,
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
            <Text style={style.HeaderTitle}>최저가 탐색 조건 설정</Text>

            <TouchableOpacity onPress={onExpand} style={style.HeaderMore}>
              <ChevronDownIcon />
            </TouchableOpacity>
          </View>

          <Animated.View style={[style.HeaderContent, collapsableStyle]}>
            <View style={style.HeaderContentItem}>
              <Text style={style.HeaderContentItemTitle}>브랜드</Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>
                      코카콜라
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>펩시</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>

            <View style={style.HeaderContentItem}>
              <Text style={style.HeaderContentItemTitle}>용량</Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>190ml</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>210ml</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>315ml</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>

            <View style={style.HeaderContentItem}>
              <Text style={style.HeaderContentItemTitle}>쇼핑몰</Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>
                      11번가
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>G마켓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>쿠팡</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>
                      인터파크
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>

            <View style={style.HeaderContentItem}>
              <Text style={style.HeaderContentItemTitle}>할인율</Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>
                      역대 최저가
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>
                      역대 할인가
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>
                      할인가
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>

            <View
              style={[style.HeaderContentItem, style.HeaderContentLastItem]}>
              <Text style={style.HeaderContentItemTitle}>카드 혜택</Text>
              <View style={style.HeaderContentItemOptionContainer}>
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>신한</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>국민</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>하나</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.HeaderContentItemOption}>
                    <Text style={style.HeaderContentItemOptionText}>현대</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Animated.View>

          <Text style={style.HeaderDescription}>
            *100ml당 가격이 낮은 순으로 소개해 드려요.
          </Text>
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
