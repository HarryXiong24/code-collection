// 739 每日温度

/**
 * 请根据每日气温列表 temperatures ，请计算在每一天需要等几天才会有更高的温度
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替
 * 示例：
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 */

// 本题有2种解法，第一种是暴力法遍历，逐个比较
// 第二种是用栈解决，这里演示用栈解决
export function dailyTemperatures(temperatures: number[]): number[] {
  let stack: number[] = []; // 栈存放天数，而不是存放温度的值
  let result: number[] = new Array(temperatures.length).fill(0); // 必须要这么写，不然会丢失0
  // i 表示天数
  for (let i = 0; i < temperatures.length; i++) {
    // 只有最开始的栈里没有东西，stack.length会等于0
    // 如果当前温度大于栈里存储天数的温度，更新结果
    while (
      temperatures.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      // 因为较小的温度会先离开栈，更新温度，所以栈里的温度是从大到小排列的
      const num = stack.pop()!;
      result[num] = i - num;
    }
    // 将当前天数放在栈里
    stack.push(i);
  }
  return result;
}

// test
const res = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
console.log(res);
