// 题目描述
// 给定一个整数数组 Array，请计算该数组在每个指定区间内元素的总和。

// 输入描述
// 第一行输入为整数数组 Array 的长度 n，接下来 n 行，每行一个整数，表示数组的元素。随后的输入为需要计算总和的区间下标：a，b （b > = a），直至文件结束。

// 输出描述
// 输出每个指定区间内元素的总和。

// 输入示例
// 5
// 1
// 2
// 3
// 4
// 5
// 0 1
// 1 3

// 输出示例
// 3
// 9

export function main(nums: number[], interval: [number, number]): number {
  const prefixSum: number[] = new Array(nums.length).fill(0);

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      prefixSum[0] = nums[0];
    } else {
      prefixSum[i] = nums[i] + prefixSum[i - 1];
    }
  }

  if (interval[0] === 0) {
    return prefixSum[interval[1]];
  }

  return prefixSum[interval[1]] - prefixSum[interval[0] - 1];
}

// test
const res = main([1, 2, 3, 4, 5], [0, 1]);
const res1 = main([1, 2, 3, 4, 5], [1, 3]);
console.log(res);
console.log(res1);
