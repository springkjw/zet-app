import {LineChart} from 'react-native-gifted-charts';
import {useWindowDimensions} from 'react-native';

import {GRAY_800, PURPLE_500} from '@assets';

export default function PriceChart({data}) {
  const {width} = useWindowDimensions();

  return (
    <LineChart
      data={data}
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
  );
}
