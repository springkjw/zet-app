import {useMemo, useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Image} from 'expo-image';
import {TouchableOpacity, View, useWindowDimensions} from 'react-native';

import {
  Text,
  Button,
  InfoChip,
  Brand,
  PriceItem,
  PriceChart,
  PeriodTab,
} from '@components';
import {
  GRAY_300,
  GRAY_500,
  GRAY_600,
  RED_500,
  PURPLE_500,
  PURPLE_600,
  ChevronRightIcon,
  InfoIcon,
  CokeImage,
} from '@assets';
import {arrayCheckIsLowestValue} from '@utils';
import useStyle from './style';

import type {ShopItemViewProps} from './type';

export default function ShopItemView({data}: ShopItemViewProps) {
  const {width} = useWindowDimensions();
  const style = useStyle();

  const renderDataPoint = useCallback(
    function () {
      return <View style={style.DataPoint} />;
    },
    [style],
  );

  const renderDataLabel = useCallback(
    function (price: number, date: string, isLowest: boolean) {
      return (
        <View style={style.DataLabelContainer}>
          {price && (
            <Text font="SEMI_T14_100" color={isLowest ? PURPLE_500 : GRAY_300}>
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
    },
    [style],
  );

  const priceItems = useMemo(
    function () {
      if (!data?.stats) {
        return [];
      }

      const minPrice = Math.min(
        ...data?.stats.map(function (item) {
          return item.value ?? 0;
        }),
      );

      return data?.stats.map(function (item, index: number) {
        return {
          value: Math.max(item.value - minPrice + 1000, 0),
          labelComponent: function () {
            return renderDataLabel(
              item.value ?? 0,
              item.date ?? '',
              arrayCheckIsLowestValue(
                data?.stats?.map(function (item) {
                  return item?.value ?? 0;
                }),
                item.value ?? 0,
              ),
            );
          },
          customDataPoint: renderDataPoint,
        };
      });
    },
    [data?.stats, renderDataLabel, renderDataPoint],
  );

  const renderHeader = useCallback(
    function () {
      return (
        <>
          <View style={style.ImageConatiner}>
            <Image style={style.Image} source={CokeImage} />
            <Image style={style.Image} source={CokeImage} />
          </View>
          <View style={style.InfoContainer}>
            <Text
              font="SEMI_T14_100"
              color={GRAY_600}
              style={style.InfoCategory}>
              {data?.categoryName ?? ''}
            </Text>
            <Text font="SEMI_T20_100" style={style.InfoTitle}>
              {data?.title ?? ''}
            </Text>

            <View style={style.InfoForm}>
              <Text
                font="SEMI_T14_100"
                color={GRAY_500}
                style={style.InfoLabel}>
                최저가
              </Text>
              <Text font="SEMI_T24_100" color={RED_500}>
                {(data?.price ?? 0).toLocaleString()}원
              </Text>
            </View>

            <View style={style.InfoForm}>
              <Text
                font="SEMI_T14_100"
                color={GRAY_500}
                style={style.InfoLabel}>
                100ml당
              </Text>
              <Text font="SEMI_T14_100">
                {(data?.perPrice ?? 0).toLocaleString()}원
              </Text>
            </View>

            {data?.brand && (
              <View style={style.InfoForm}>
                <Text
                  font="SEMI_T14_100"
                  color={GRAY_500}
                  style={style.InfoLabel}>
                  판매처
                </Text>
                <View style={style.InfoBrand}>
                  <Brand
                    data={data?.brand}
                    size={36}
                    canSelect={false}
                    hasName={false}
                  />
                </View>
              </View>
            )}

            {data?.shippingPrice && data?.shippingPrice > 0 && (
              <View style={style.InfoForm}>
                <Text
                  font="SEMI_T14_100"
                  color={GRAY_500}
                  style={style.InfoLabel}>
                  배송비
                </Text>
                <Text font="SEMI_T14_100">
                  {(data?.shippingPrice ?? 0).toLocaleString()}원 별도
                </Text>
              </View>
            )}

            <View style={style.InfoForm}>
              <Text
                font="SEMI_T14_100"
                color={GRAY_500}
                style={style.InfoLabel}>
                카드할인
              </Text>
              <Text font="SEMI_T14_100">신한카드 12,300원</Text>
              <InfoChip label="조건있음" style={style.InfoChip} />
            </View>

            <Button label="최저가로 구매하기" style={style.InfoButton} />
          </View>

          <View style={style.CardBenefitWrapper}>
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
          </View>

          <View style={style.Divider} />

          {priceItems.length > 0 && (
            <>
              <View style={style.StatsContainer}>
                <Text font="SEMI_T20_100" style={style.InfoTitle}>
                  최저가 그래프
                </Text>

                <View style={style.InfoPeriodTab}>
                  <PeriodTab />
                </View>

                <PriceChart data={priceItems} />
              </View>

              <View style={style.Divider} />
            </>
          )}

          <View style={style.PriceContainer}>
            <View style={style.PriceTitleContainer}>
              <Text font="SEMI_T20_100" style={style.PriceTitle}>
                가격비교
              </Text>
              <InfoIcon size={20} color={GRAY_500} />
            </View>

            {data?.prices && data.prices.length > 5 && (
              <TouchableOpacity style={style.PriceMoreButton}>
                <Text font="SEMI_T16_100" color={PURPLE_600}>
                  {`${data?.prices.length - 5}개 더보기`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      );
    },
    [data, style, priceItems, width],
  );

  const renderFooter = useCallback(function () {
    return (
      <>
        <View style={style.Space} />
        <View style={style.Divider} />
        <View style={style.ItemInfoContainer}>
          <Text font="SEMI_T18_100">제품정보</Text>

          <View style={style.ItemInfoTable}>
            <View style={style.ItemInfoRow}>
              <View style={style.ItemInfoCell1}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  식품 유형
                </Text>
              </View>
              <View style={style.ItemInfoCell2}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  음료
                </Text>
              </View>
            </View>

            <View style={style.ItemInfoRow}>
              <View style={style.ItemInfoCell1}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  포장 형태
                </Text>
              </View>
              <View style={style.ItemInfoCell2}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  캔류
                </Text>
              </View>
            </View>

            <View style={style.ItemInfoRow}>
              <View style={style.ItemInfoCell1}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  용량
                </Text>
              </View>
              <View style={style.ItemInfoCell2}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  190ml
                </Text>
              </View>
            </View>

            <View style={style.ItemInfoRow}>
              <View style={style.ItemInfoCell1}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  개수
                </Text>
              </View>
              <View style={style.ItemInfoCell2}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  12캔
                </Text>
              </View>
            </View>

            <View style={style.ItemInfoRow}>
              <View style={style.ItemInfoCell1}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  특징
                </Text>
              </View>
              <View style={style.ItemInfoCell2}>
                <Text font="SEMI_T14_100" color={GRAY_500}>
                  무가당, 무설탕
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }, []);

  return (
    <View style={style.Wrapper}>
      <FlashList
        keyExtractor={function (item) {
          return item.id;
        }}
        data={data?.prices.slice(0, 5) ?? []}
        renderItem={function ({item}) {
          return (
            <View style={style.PriceItemContainer}>
              <PriceItem />
            </View>
          );
        }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={style.ScrollContentContainer}
        estimatedItemSize={72}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={function () {
          return <View style={style.Separator} />;
        }}
      />
    </View>
  );
}
