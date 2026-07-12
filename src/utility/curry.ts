type CurriedFunction = (...args: any[]) => any;

/**
 * 커리함수
 * 함수를 반환한다.
 * @params 여러개의 매개변수를 받아 부분적으로 적용할 함수
 */
function curry(fn: CurriedFunction) {
  // 요구사항 분석
  // 만약 3개의 인수가 필요한 함수를 받는다면 총 3개의 인수를 부분적으로 받을 수 있어야한다.
  // 즉 (1)(2, 3), (1)(2)(3) 형태가 되어야한다.
  // 그렇다면 함수를 반환하도록 해야할것 같다.
  // fn이 부분적으로 적용할 함수이기 때문에, fn의 매개변수를 받아온다
  // fn과 실제 인수를 받을 함수의 매개변수 개수로 비교한다.

  // 함수의 매개변수와, curried 함수가 받은 매개변수를 비교.
  const curried = (...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // 즉 이전에 호출받은 인수를 어떻게 기억할 것인가가 핵심
    // 그러면 클로저를 사용하면 되지않을까?
    return (...nextArgs: any[]) => {
      // 반환된 익명 함수가 curried 함수의 args에 참조할 수 있어야 한다.
      // 따라서 클로저를 사용하여 해결할 수 있음
      const mergedArgs = [...args, ...nextArgs];
      return curried.apply(null, mergedArgs);
    };
  };

  return curried;

  const curring = (...args: any[]): ReturnType<CurriedFunction> => {
    if (fn.length > args.length) {
      // 1이 들어왔는데 여기서 다음 2를 받아야해. 여기서 함수를 하나 더 만들 순 없을것 같아.
      // 왜냐하면 매개변수의 개수에 따라 변경되어야하기 때문이야.
      // bind로 함수를 넘겨주면 되나?
      // (1) => 1
      // (1)(2) => 1, 2
      // (1)(2)(3) => 1, 2, 3
      // 위와 같이 할 순 없을까?
      // console.log(args);
      // 내가 여기서 막힌 이유가 무엇일까?
      // 현재 args를 어떻게 합쳐서 받아야할지를 모르겠다는거야.
      return curring.bind(null, ...args);
    } else {
      return fn(...args);
    }
  };

  return curring;

  return (...args: any[]) => {
    console.log("fn.length", fn.length);
    console.log("args.length", args.length);
    // fn의 개수와 함수의 매개변수 개수로 비교하여 다시 함수를 반환하도록 해야한다.
    if (fn.length > args.length) {
      // 함수의 매개변수를 받아야하는데, 어떻게 합치지?
      // fn(...args) 이렇게가 안되는데, fn의 함수가 다른 매개변수를 받아서 어떻게 전달할 수 있을까?
      // fn(...args, ...args2)와 같은 형태가 되어야함
    } else {
      // fn의 개수와 함수의 매개변수가 같다면 그대로 반환한다
      // args는 rest paramter라서 배열로 들어온다, 이걸 다시 spread 연산자로 각 매개변수에 맡게 들어가도록 한다.
      return fn(...args);
    }
  };
}

const join = (a: number, b: number, c: number) => {
  return `${a}_${b}_${c}`;
};

export const curriedJoin = curry(join);
