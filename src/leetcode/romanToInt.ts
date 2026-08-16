/**
 * LeetCode 13. 로마 숫자를 정수로 (Roman to Integer)
 *
 * 로마 숫자는 다음 7개의 기호로 표현된다.
 *
 * | 기호 | 값   |
 * | ---- | ---- |
 * | I    | 1    |
 * | V    | 5    |
 * | X    | 10   |
 * | L    | 50   |
 * | C    | 100  |
 * | D    | 500  |
 * | M    | 1000 |
 *
 * 예를 들어 숫자 2는 1을 두 번 더한 `II`로 표현한다.
 * 12는 `X + II`인 `XII`, 27은 `XX + V + II`인 `XXVII`로 표현한다.
 *
 * 로마 숫자는 일반적으로 값이 큰 기호부터 작은 기호 순서로 왼쪽에서 오른쪽으로 작성한다.
 * 하지만 숫자 4는 `IIII`가 아니라 `IV`로 표현한다.
 * 값이 1인 `I`가 값이 5인 `V` 앞에 있으므로, 5에서 1을 빼서 4가 된다.
 * 같은 원리로 숫자 9는 `IX`로 표현한다.
 *
 * 뺄셈이 사용되는 경우는 다음 6가지다.
 * - `I`는 `V`와 `X` 앞에 올 수 있으며, 각각 4와 9를 나타낸다.
 * - `X`는 `L`과 `C` 앞에 올 수 있으며, 각각 40과 90을 나타낸다.
 * - `C`는 `D`와 `M` 앞에 올 수 있으며, 각각 400과 900을 나타낸다.
 *
 * 로마 숫자 문자열 `s`가 주어졌을 때, 이를 정수로 변환한다.
 *
 * @example
 * ```ts
 * romanToInt("III"); // 3
 * ```
 * `III = 3`
 *
 * @example
 * ```ts
 * romanToInt("LVIII"); // 58
 * ```
 * `L = 50`, `V = 5`, `III = 3`
 *
 * @example
 * ```ts
 * romanToInt("MCMXCIV"); // 1994
 * ```
 * `M = 1000`, `CM = 900`, `XC = 90`, `IV = 4`
 *
 * 제약 조건:
 * - `1 <= s.length <= 15`
 * - `s`에는 `I`, `V`, `X`, `L`, `C`, `D`, `M`만 포함된다.
 * - `s`는 `[1, 3999]` 범위의 유효한 로마 숫자임이 보장된다.
 */

const romanMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// 현재 값과 다음 값을 기준으로 문제 풀이
export function romanToInt(roman: string): number {
  let result = 0;

  for (let index = 0; index < roman.length; index++) {
    const currentValue = romanMap[roman[index]];
    const nextRomanChar = roman[index + 1];
    let nextValue = 0;

    if (nextRomanChar !== undefined) {
      nextValue = romanMap[nextRomanChar];
    }

    if (currentValue >= nextValue) {
      result += currentValue;
    } else {
      result += nextValue - currentValue;
      index += 1;
    }
  }

  return result;
}

// 현재 값과 이전 값을 기준으로 문제 풀이
export function romanToInt2(roman: string): number {
  let result = 0;
  let prevNumber = 0;

  for (let index = 0; index < roman.length; index++) {
    const currentValue = romanMap[roman[index]];

    if (currentValue > prevNumber) {
      result += currentValue - prevNumber * 2;
    } else {
      result += currentValue;
    }

    prevNumber = currentValue;
  }

  return result;
}

/**
 * 목적:
 * 로마 숫자를 입력받아, 표준 숫자로 변환한다
 *
 * 입력:
 * `s`: 유효한 로마 숫자
 * - `1 <= s.length <= 15`
 * - `I`, `V`, `X`, `L`, `C`, `D`, `M` 포함
 *
 * 출력:
 * 로마 숫자를 정수로 변환
 * number - [1, 3999] 범위의 정수
 *
 * 처리:
 * 현재 값이 다음 값보다 크거나 같으면 더한다
 * 현재 값이 다음 값보다 작다면, `현재 값 - 다음 값`으로 처리한다
 *
 * 흐름:
 * [MCMXCIV] 기준
 * index: 0, 현재 값: 1000, 다음 값: 100, 1000 >= 100 -> 더하기, 누적 값: 1000
 * index: 1,2 현재 값: 100, 다음 값: 1000, 100 < 1000 -> 빼기, 누적 값: 1900
 * index: 3,4 현재 값: 10, 다음 값: 100, 10 < 100 -> 빼기, 누적 값: 1990
 * index: 5,6 현재 값: 1, 다음 값: 5, 1 < 5 -> 빼기, 누적 값: 1994
 *
 * 엣지 케이스:
 * roman.length === 1인 경우, 현재 값(1), 다음 값(undefined)이기 때문에 다음 값을 0으로 처리하고 더한다. 즉 케이스 통과
 *
 * [MCMXCIV] 현재 값과 이전 값 기준
 * - 현재 값이 이전 값보다 크다면 빼야한다
 * - 현재 값이 이전 값보다 작거나 같다면 더해야한다
 *
 * index: 0, 현재 값: 1000, 이전 값: 0, 1000 > 0 -> 빼기, 누적 값: 1000
 * index: 1, 현재 값: 100, 이전 값: 1000, 100 <= 1000 -> 더하기, 누적 값: 1100
 * index: 2, 현재 값: 1000, 이전 값: 100, 1000 > 100 -> 빼기, 누적 값: 1100 + (1000 - 100 * 2) = 1900
 * index: 3, 현재 값: 10, 이전 값: 1000, 10 <= 1000  -> 더하기, 누적 값: 1900 + 10 = 1910
 * index: 4, 현재 값: 100, 이전 값: 10, 100 > 10 -> 빼기, 누적 값: 1910 + (100 - 10 * 2) = 1990
 * index: 5, 현재 값: 1, 이전 값: 100, 1 < = 100 -> 더하기, 누적 값: 1990 + 1
 * index; 6, 현재 값: 5, 이전 값: 1, 5 > 1 -> 빼기, 누적 값: 1991 + (5 - 1 * 2) = 1994
 *
 * 엣지 케이스:
 * [I] 기준
 * roman.length === 1인 경우
 * - 현재 값(1) - 이전 값(0) * 2이기 때문에 케이스 통과
 *
 * 복잡도 에상:
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 */
