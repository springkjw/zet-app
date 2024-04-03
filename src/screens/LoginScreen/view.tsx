import {TextInput, View} from 'react-native';
import {useRef, useLayoutEffect} from 'react';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Button, Text, Brand} from '@components';
import {WHITE, GRAY_100, GRAY_600} from '@assets';
import useStyle from './style';

import type {LoginViewProps} from './type';

export default function LoginView({
  step,
  shops,
  cards,
  nickname,
  selectedShop,
  selectedCard,
  onChangeNickname,
  onSelectShop,
  onSelectCard,
  onNext,
}: LoginViewProps) {
  const style = useStyle();
  const insets = useSafeAreaInsets();

  const inputRef = useRef<TextInput>(null);

  const keyboard = useAnimatedKeyboard();

  useLayoutEffect(function () {
    inputRef.current?.focus();
  }, []);

  const stepOneContentStyle = useAnimatedStyle(function () {
    return {
      transform: [
        {
          translateY: Math.min(
            -keyboard.height.value / 2 - 16,
            -insets.bottom - 16,
          ),
        },
      ],
    };
  });

  const stepOneButtonStyle = useAnimatedStyle(function () {
    return {
      transform: [
        {
          translateY: Math.min(
            -keyboard.height.value - 16,
            -insets.bottom - 16,
          ),
        },
      ],
    };
  });

  return (
    <View style={style.Container}>
      <View style={style.HeaderContainer}>
        <Text font="SEMI_T20_100" color={GRAY_600}>
          {step}/3
        </Text>
      </View>

      {step === 1 && (
        <Animated.View style={[stepOneContentStyle, style.StepOneContainer]}>
          <View style={style.NicknameContainer}>
            <TextInput
              ref={inputRef}
              cursorColor={WHITE}
              style={style.Input}
              placeholder="닉네임"
              placeholderTextColor={GRAY_600}
              maxLength={10}
              keyboardAppearance="dark"
              onChangeText={onChangeNickname}
            />
            <Text font="SEMI_T24_150" style={style.InputLabel}>
              님,
            </Text>
          </View>
          <Text font="SEMI_T14_100" color={GRAY_100}>
            {nickname?.length ?? 0}/10
          </Text>
          <Text font="SEMI_T24_150" style={style.Description}>
            몇 가지 더 설정하고{'\n'}함께 최저가 콜라 즐겨요!
          </Text>
        </Animated.View>
      )}

      {step === 2 && (
        <View style={style.StepTwoContainer}>
          <View style={style.StepTwoDescription}>
            <Text font="SEMI_T24_150">
              복슬복슬한반달가슴곰 님,{`\n`}어떤 쇼핑몰에서{`\n`}가격을
              탐지할까요?
            </Text>
          </View>

          <View style={style.BrandContainer}>
            <View style={style.BrandItem}>
              <Brand
                data={{id: null, name: '전체'}}
                isSelected={false}
                onSelect={function () {
                  return onSelectShop(shops);
                }}
              />
            </View>
            {shops?.map(function (shop) {
              return (
                <View style={style.BrandItem}>
                  <Brand
                    data={shop}
                    isSelected={selectedShop?.includes(shop) ?? false}
                    onSelect={function (brand) {
                      return onSelectShop([brand]);
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={style.StepTwoContainer}>
          <View style={style.StepTwoDescription}>
            <Text font="SEMI_T24_150">
              어떤 카드의{`\n`}
              할인 혜택 알림을{`\n`}
              받아볼까요?
            </Text>
          </View>

          <View style={style.BrandContainer}>
            {cards?.map(function (brand) {
              return (
                <View style={style.BrandItem}>
                  <Brand
                    data={brand}
                    isSelected={selectedCard?.includes(brand)}
                    onSelect={function (brandId) {
                      if (!brandId) {
                        return;
                      }
                      return onSelectCard(brandId);
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      )}

      <Animated.View style={[stepOneButtonStyle, style.ButtonContainer]}>
        <Button onPress={onNext} label={step === 1 ? '다음' : '계속하기'} />
      </Animated.View>
    </View>
  );
}
