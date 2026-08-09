/**
 * 문제
 * 커링(currying)은 자바스크립트 애플리케이션에서 자주 쓰이는 기법입니다.
 * 함수 하나를 받아서, 커링된 함수를 돌려주는 curry() 함수를 구현해 주세요.
 *
 * 예시
 * const join = (a, b, c) => {
 *  return `${a}_${b}_${c}`
 * }
 * const curriedJoin = curry(join)
 * curriedJoin(1, 2, 3)   // '1_2_3'
 * curriedJoin(1)(2, 3)   // '1_2_3'
 * curriedJoin(1, 2)(3)   // '1_2_3'
 */

type CurriedFunction = (...args: any[]) => any;

export function curry(fn: CurriedFunction) {
  /**
   * curry는 함수를 받고 함수를 반환한다
   * 반환된 함수는 인수를 여러번 받을 수 있다. (1개, 2개, 3개)
   * 인수가 부족하면 함수를 반환하고, 인수가 다 차면 값을 반환한다
   */
  return function curried(...args: any[]) {
    // 함수에 전달할 매개변수만 남기기
    const appliedArgs = args.slice(0, fn.length);

    // 전달받은 인수가 함수의 매개변수 개수와 같을 때
    if (appliedArgs.length === fn.length) {
      return fn(...appliedArgs);
    }

    // 인수가 부족하면, 다음 인수를 더 받기 위한 함수를 반환
    return (...nextArgs: any[]) => {
      return curried.call(this, ...appliedArgs, ...nextArgs);
    };
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

export const curriedJoin = curry(join);
