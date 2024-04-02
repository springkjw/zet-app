import Svg, {Path} from 'react-native-svg';

export default function UserIcon() {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M26 27.25V24.75C26 23.4239 25.4732 22.1521 24.5355 21.2145C23.5979 20.2768 22.3261 19.75 21 19.75H11C9.67392 19.75 8.40215 20.2768 7.46447 21.2145C6.52678 22.1521 6 23.4239 6 24.75V27.25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.002 14.75C18.7634 14.75 21.002 12.5114 21.002 9.75C21.002 6.98858 18.7634 4.75 16.002 4.75C13.2405 4.75 11.002 6.98858 11.002 9.75C11.002 12.5114 13.2405 14.75 16.002 14.75Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
