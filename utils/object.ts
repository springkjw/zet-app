import type { ViewStyle, TextStyle } from "react-native";

export function setStyleValue(
  obj: ViewStyle | TextStyle,
  key: string,
  value: unknown,
  onlyValid: boolean = true
) {
  /**
   * obj 객체에 대해 key, value 값을 할당
   * onlyValid가 참일 경우, null, undefined, '' 일 경우 해당 키를 무시합니다.
   */
  if (onlyValid) {
    if (value === null || value === undefined || value === "") {
      return;
    }
  }

  Object.assign(obj, { [key]: value });
}
