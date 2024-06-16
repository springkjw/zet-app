import Svg, {Path} from 'react-native-svg';

interface TrendIconProps {
  size?: number;
}

export default function TrendIcon({size = 32}: TrendIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M27.9997 9.45459L17.6362 19.8181L12.1817 14.3636L4 22.5453"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.4551 9.45459H28.0004V16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
