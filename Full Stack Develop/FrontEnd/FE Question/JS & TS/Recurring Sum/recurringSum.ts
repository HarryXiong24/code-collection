// Create a sum function that can be used for summing all args.

// - If there isn't any arguments, return the final result
// - If there are any arguments, return a function that can be used again to sum with previous result.

// Test Cases:
// sum() // expect 0;
// sum(1) // expect a function
// sum(1, 2) // expect a function
// sum(1, 2)() // expect 3;
// sum(1, 2)(3) // expect a function;
// sum(1, 2)(3)() // expect 6;
// sum(1, 1)(1, 1)(1, 1)(1, 1)(1, 1) // expect a function;
// sum(1, 1)(1, 1)(1, 1)(1, 1)(1, 1)() // expect 10;

// sum(1)()() // invalid test cases, expect to throw an error

export const sum = (...args: number[]): any => {
  let res = 0;
  const _sum = (..._args: number[]) => {
    if (!_args.length) {
      return res;
    }

    res += _args.reduce((pre, cur) => pre + cur, 0);
    return _sum;
  };

  return _sum(...args);
};

const res1 = sum(); // expect 0;
const res2 = sum(1); // expect a function
const res3 = sum(1, 2); // expect a function
const res4 = sum(1, 2)(); // expect 3;
const res5 = sum(1, 2)(3); // expect a function;
const res6 = sum(1, 2)(3)(); // expect 6;
const res7 = sum(1, 1)(1, 1)(1, 1)(1, 1)(1, 1); // expect a function;
const res8 = sum(1, 1)(1, 1)(1, 1)(1, 1)(1, 1)(); // expect 10;

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);
console.log(res6);
console.log(res7);
console.log(res8);

try {
  const res9 = sum(1)()(); // invalid test cases, expect to throw an error
  console.log(res9);
} catch (e) {
  console.log(e);
}
