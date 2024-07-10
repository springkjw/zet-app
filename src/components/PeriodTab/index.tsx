import {useState, useCallback, useMemo} from 'react';
import {View, TouchableOpacity, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {WHITE, GRAY_600} from '@assets';
import {Text} from '@components';
import useStyle from './style';

export default function PeriodTab() {
  const style = useStyle();
  const {width} = useWindowDimensions();

  const tabWidth = useMemo(
    function () {
      console.log((width - 72) / 3);
      return (width - 72) / 3;
    },
    [width],
  );

  const [selected, setSelected] = useState<number>(0);
  const position = useSharedValue(0);

  const handlePress = useCallback(
    function (index: number) {
      setSelected(index);
      position.value = withTiming(index * (tabWidth + 8));
    },
    [position.value, width],
  );

  const animatedStyle = useAnimatedStyle(function () {
    return {
      transform: [{translateX: position.value}],
    };
  });

  return (
    <View style={style.PeriodTabContainer}>
      <Animated.View
        style={[style.PeriodTabAnimatedBackground, animatedStyle]}
      />
      {['1개월', '3개월', '6개월'].map(function (item, index) {
        return (
          <TouchableOpacity
            key={item}
            style={style.PeriodTabButton}
            onPress={function () {
              handlePress(index);
            }}>
            <Text
              font="SEMI_T14_150"
              color={selected === index ? WHITE : GRAY_600}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
