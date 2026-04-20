/**
 * Debounce 함수 구현 과제
 * @param callback 실행할 타겟 함수
 * @param delay 대기 시간 (ms)
 * @returns 디바운스가 적용된 새로운 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}
