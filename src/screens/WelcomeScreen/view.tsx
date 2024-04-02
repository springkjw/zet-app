import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeOut, Easing} from 'react-native-reanimated';

import {Button} from '@components';
import useStyle from './style';

export default function WelcomeView() {
  const style = useStyle();

  const [step, setStep] = useState(0);

  useEffect(function () {
    setInterval(function () {
      setStep(function (prev) {
        if (prev === 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  }, []);

  return (
    <View style={style.Container}>
      <View style={style.Content}></View>
      <View style={style.BottomContainer}>
        <View style={style.ContentTextContainer}>
          {step === 0 && (
            <Animated.Text
              entering={FadeIn.delay(2500).easing(Easing.ease)}
              exiting={FadeOut.delay(2500).easing(Easing.ease)}
              style={style.ContentText}>
              <Text style={style.ContentStringText}>최저가 할인 정보</Text>와
              실시간{'\n'}가격변동 소식을 간편하게 받아봐요
            </Animated.Text>
          )}
          {step === 1 && (
            <Animated.Text
              entering={FadeIn.delay(2500).easing(Easing.ease)}
              exiting={FadeOut.delay(2500).easing(Easing.ease)}
              style={style.ContentText}>
              다른 쓸모없는 알림말고{'\n'}
              오직 <Text style={style.ContentStringText}>제로음료</Text>에
              관해서만
            </Animated.Text>
          )}
        </View>

        <View style={style.AgreeTextContainer}>
          <Text style={style.AgreeText}>서비스 시작 시 </Text>
          <TouchableOpacity>
            <Text style={[style.AgreeText, style.AgreeTextStrike]}>
              이용약관
            </Text>
          </TouchableOpacity>
          <Text style={style.AgreeText}> 및 </Text>
          <TouchableOpacity>
            <Text style={[style.AgreeText, style.AgreeTextStrike]}>
              개인정보처리방침
            </Text>
          </TouchableOpacity>
          <Text style={style.AgreeText}>에 동의 처리됩니다.</Text>
        </View>

        <Button label="ZET와 최저가 탐색 시작하기" />
      </View>
    </View>
  );
}
