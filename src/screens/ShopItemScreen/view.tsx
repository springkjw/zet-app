import {View, ScrollView} from 'react-native';

import {Text, Button, InfoChip, Brand} from '@components';
import {GRAY_500, GRAY_600, RED_500, ChevronRightIcon} from '@assets';
import useStyle from './style';

export default function ShopItemView() {
  const style = useStyle();

  return (
    <View style={style.Wrapper}>
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
      </ScrollView>
    </View>
  );
}
