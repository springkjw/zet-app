import Svg, {Path} from 'react-native-svg';

import {WHITE} from '@assets';

export default function ChevronDownIcon({size = 20, color = WHITE}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15 7.5L10 12.5L5 7.5"
        stroke={color}
        strokeOpacity="0.9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
