export function arrayCheckIsLowestValue(arr: number[], value: number) {
  /**
   * 배열 중에서 가장 낮은 값인지 확인
   */
  return Math.min(...arr) === value;
}

export function arrayFindIndexLowestValue(arr: number[]) {
  /**
   * 배열 중에서 가장 낮은 값의 인덱스 반환
   */
  return arr?.indexOf(Math.min(...arr));
}
