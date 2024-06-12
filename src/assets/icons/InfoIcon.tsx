import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

export default function InfoIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0_439_22280)">
        <Path
          d="M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z"
          stroke="#8C96F1"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 5.33337V8.00004"
          stroke="#8C96F1"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 10.6666H8.00625"
          stroke="#8C96F1"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_439_22280">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
