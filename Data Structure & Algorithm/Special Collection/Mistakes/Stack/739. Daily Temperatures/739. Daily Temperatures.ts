// 739. Daily Temperatures

// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
// If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Example 1:
// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]

// Example 2:
// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]

// Example 3:
// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// This question has a simple solution which is brute force
// But now we use stack, and the time complexity is O(n)
export function dailyTemperatures(temperatures: number[]): number[] {
  // this stack is used to store the number of day gap
  const stack: number[] = [];
  const res: number[] = new Array(temperatures.length).fill(0);

  for (let dayGap = 0; dayGap < temperatures.length; dayGap++) {
    while (stack.length > 0 && temperatures[dayGap] > temperatures[stack[stack.length - 1]]) {
      const num = stack.pop()!;
      res[num] = dayGap - num;
    }
    stack.push(dayGap);
  }

  return res;
}

// test
const res = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
console.log(res);
