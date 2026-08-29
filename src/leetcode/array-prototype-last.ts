/**
 * LeetCode 2619. 배열 프로토타입의 last (Array Prototype Last)
 *
 * 모든 배열에서 `array.last()` 메서드를 호출할 수 있도록 코드를 작성한다.
 *
 * - 배열에 요소가 있다면 마지막 요소를 반환한다.
 * - 배열이 비어 있다면 `-1`을 반환한다.
 * - 배열은 `JSON.parse`의 결과라고 가정할 수 있다.
 *
 * 새로운 배열 하나에만 메서드를 추가하는 문제가 아니라,
 * `Array.prototype`을 확장해 모든 배열에서 `last()`를 쓸 수 있게 만드는 것이 핵심이다.
 *
 * @example
 * ```ts
 * const nums = [null, {}, 3];
 * nums.last(); // 3
 * ```
 * 마지막 요소인 `3`을 반환한다.
 *
 * @example
 * ```ts
 * const nums = [];
 * nums.last(); // -1
 * ```
 * 배열에 요소가 없으므로 `-1`을 반환한다.
 *
 * 제약 조건:
 * - `arr`는 유효한 JSON 배열이다.
 * - `0 <= arr.length <= 1000`
 *
 * 힌트:
 * 메서드 안에서 자신을 호출한 배열에 접근하려면 무엇이 필요할까?
 * 그리고 함수를 어떤 형태로 선언하느냐에 따라 그 값이 달라지지는 않을까?
 */

declare global {
  interface Array<T> {
    last(): T | -1;
  }
}

Array.prototype.last = function () {
  if (this.length === 0) {
    return -1;
  }

  const lastIndex = this.length - 1;

  return this[lastIndex];
};

/**
 * 목적:
 * - 모든 배열에서 `array.last()` 메서드를 호출할 수 있도록 코드를 작성한다.
 *
 * 입력:
 * - 자신을 호출한 배열
 *
 * 출력:
 * - 배열 중 가장 마지막 요소를 반환한다
 * - 배열에 길이가 0이라면 -1을 반환한다
 *
 * 처리:
 * - 자신을 호출한 배열이 무엇인지를 알아야함
 * - 함수가 어떻게 호출되었는지에 따라 this binding이 달라진다.
 *   - 화살표 함수는 this binding이 없기 때문에 상위 스코프를 가리킨다.
 *   - 자신을 호출한 배열에 접근하기 위해서는 일반 함수로 사용해야 한다.
 * - this의 length가 0이라면 -1을 반환한다
 * - this의 length가 0이 아니라면 배열의 마지막 인덱스를 구한다. `array.length - 1`
 * - this의 마지막 인덱스를 붙여 값을 반환한다
 *
 * 예외처리:
 * - 배열이 비어있다면 -1 처리
 */
