import type { ViewStyle, TextStyle, ImageStyle } from "react-native";

/**
 * 타입 안전한 스타일 값 설정 함수
 * @template T - ViewStyle, TextStyle, ImageStyle 중 하나
 * @param obj - 스타일 객체
 * @param key - 스타일 속성 키 (타입 안전하게 검증됨)
 * @param value - 설정할 값
 * @param onlyValid - true일 경우 null, undefined, '' 값을 무시
 */
export function setStyleValue<T extends ViewStyle | TextStyle | ImageStyle>(
  obj: T,
  key: keyof T,
  value: T[keyof T],
  onlyValid: boolean = true
): void {
  if (onlyValid) {
    if (value === null || value === undefined || value === "") {
      return;
    }
  }

  // 타입 안전한 할당
  (obj as any)[key] = value;
}

/**
 * 스타일 값의 유효성을 런타임에 검증
 */
export function isValidStyleValue(value: unknown): boolean {
  return value !== null && value !== undefined && value !== "";
}
