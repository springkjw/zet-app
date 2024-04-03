import Svg, {Path} from 'react-native-svg';

export default function ChevronLeftIcon() {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
