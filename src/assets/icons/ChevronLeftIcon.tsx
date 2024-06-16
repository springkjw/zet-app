import Svg, {Path} from 'react-native-svg';

interface ChevronLeftIconProps {
  size?: number;
}

export default function ChevronLeftIcon({size = 32}: ChevronLeftIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M20 6L11 15.5L20 25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
