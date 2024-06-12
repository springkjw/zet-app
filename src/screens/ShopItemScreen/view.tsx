import {useMemo, useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {View, ScrollView, useWindowDimensions} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import {Text, Button, InfoChip, Brand} from '@components';
import {
  GRAY_300,
  GRAY_500,
  GRAY_600,
  GRAY_800,
  RED_500,
  PURPLE_500,
  ChevronRightIcon,
  InfoIcon,
} from '@assets';
import useStyle from './style';

export default function ShopItemView() {
  const {width} = useWindowDimensions();
  const style = useStyle();

  const priceData = [
    {value: 11500, date: '23.11.07'},
    {value: 11000, date: '23.11.12'},
    {value: 13000, date: '23.11.28'},
  ];

  const renderDataPoint = useCallback(
    function () {
      return <View style={style.DataPoint} />;
    },
    [style],
  );

  const renderDataLabel = useCallback(function (price: number, date: string) {
    return (
      <View style={style.DataLabelContainer}>
        {price && (
          <Text font="SEMI_T14_100" color={GRAY_300}>
            {price.toLocaleString()}원
          </Text>
        )}
        <View style={style.DataLabelDate}>
          <Text font="MEDIUM_T12_100" color={GRAY_500}>
            {date}
          </Text>
        </View>
      </View>
    );
  }, []);

  const priceItems = useMemo(
    function () {
      const minPrice = Math.min(
        ...priceData.map(function (item) {
          return item.value;
        }),
      );

      return priceData.map(function (item, index: number) {
        return {
          value: item.value - minPrice + 1000,
          labelComponent: function () {
            return renderDataLabel(item.value, item.date);
          },
          customDataPoint: renderDataPoint,
        };
      });
    },
    [priceData, renderDataLabel, renderDataPoint],
  );

  return (
    <View style={style.Wrapper}>
      <FlashList data={data} />

      <ScrollView contentContainerStyle={style.ScrollContentContainer}>
        <View style={style.InfoContainer}>
          <Text font="SEMI_T14_100" color={GRAY_600} style={style.InfoCategory}>
            코카콜라 음료
          </Text>
          <Text font="SEMI_T20_100" style={style.InfoTitle}>
            코카콜라 제로 190ml (12개)
          </Text>

          <View style={style.InfoForm}>
            <Text font="SEMI_T14_100" color={GRAY_500} style={style.InfoLabel}>
              최저가
            </Text>
            <Text font="SEMI_T24_100" color={RED_500}>
              19,000원
            </Text>
          </View>

          <View style={style.InfoForm}>
            <Text font="SEMI_T14_100" color={GRAY_500} style={style.InfoLabel}>
              100ml당
            </Text>
            <Text font="SEMI_T14_100">100원</Text>
          </View>

          <View style={style.InfoForm}>
            <Text font="SEMI_T14_100" color={GRAY_500} style={style.InfoLabel}>
              판매처
            </Text>
            <View style={style.InfoBrand}>
              <Brand size={36} canSelect={false} hasName={false} />
            </View>
          </View>

          <View style={style.InfoForm}>
            <Text font="SEMI_T14_100" color={GRAY_500} style={style.InfoLabel}>
              배송비
            </Text>
            <Text font="SEMI_T14_100">3,000원 별도</Text>
          </View>

          <View style={style.InfoForm}>
            <Text font="SEMI_T14_100" color={GRAY_500} style={style.InfoLabel}>
              카드할인
            </Text>
            <Text font="SEMI_T14_100">신한카드 12,300원</Text>
            <InfoChip label="조건있음" style={style.InfoChip} />
          </View>

          <Button label="최저가로 구매하기" style={style.InfoButton} />
        </View>

        <View style={style.CardBenefitContainer}>
          <View>
            <Text font="SEMI_T16_150">
              신한카드, 국민카드가 있다면{'\n'}이 가격에 구입 가능해요!
            </Text>
            <View style={style.CardBenefitPriceContainer}>
              <Text font="SEMI_T18_100" color={RED_500}>
                11,800원
              </Text>
              <InfoChip label="조건있음" style={style.InfoChip} />
            </View>
          </View>

          <View style={style.CardBenefitBrandContainer}>
            <Brand
              size={56}
              canSelect={false}
              hasName={false}
              style={style.CardBenefitBrand}
            />
            <ChevronRightIcon />
          </View>
        </View>

        <View style={style.Divider} />

        <View style={style.StatsContainer}>
          <Text font="SEMI_T20_100" style={style.InfoTitle}>
            최저가 그래프
          </Text>

          <LineChart
            data={priceItems}
            areaChart
            hideYAxisText
            adjustToWidth
            spacing={width / 2.5}
            height={176}
            hideRules
            xAxisColor={GRAY_800}
            yAxisColor={GRAY_800}
            color1={PURPLE_500}
            startFillColor1={PURPLE_500}
            endFillColor1="#0D0D0D"
            endOpacity1={0}
            stripColor={PURPLE_500}
            isAnimated
            animateOnDataChange
            animationDuration={1000}
            onDataChangeAnimationDuration={300}
            pointerConfig={{
              initialPointerIndex: 1,
              persistPointer: true,
              pointerStripUptoDataPoint: true,
              pointerStripColor: PURPLE_500,
              pointerStripWidth: 3,
              strokeDashArray: [2, 5],
              pointerColor: PURPLE_500,
              radius: 4,
              activatePointersOnLongPress: true,
            }}
          />
        </View>

        <View style={style.Divider} />

        <View style={style.PriceContainer}>
          <View style={style.PriceTitleContainer}>
            <Text font="SEMI_T20_100" style={style.PriceTitle}>
              가격비교
            </Text>
            <InfoIcon size={20} color={GRAY_500} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
