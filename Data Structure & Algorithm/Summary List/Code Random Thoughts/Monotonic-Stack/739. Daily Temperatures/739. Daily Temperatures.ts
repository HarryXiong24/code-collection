// 739. Daily Temperatures

// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Example 1:
// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]

// Example 2:
// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]

// Example 3:
// Input: temperatures = [30,60,90]
// Output: [1,1,0]

export function dailyTemperatures(temperatures: number[]): number[] {
  const monotonic_stack: number[] = [];
  const result: number[] = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    while (monotonic_stack && temperatures[monotonic_stack[monotonic_stack.length - 1]] < temperatures[i]) {
      const top = monotonic_stack.pop()!;
      result[top] = i - top;
    }
    monotonic_stack.push(i);
  }

  return result;
}

// test
const res = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
console.log(res);
