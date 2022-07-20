// 347 前 K 个高频元素

/**
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。
 * 示例 1:
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 */

export function topKFrequent(nums: number[], k: number): number[] {
  const map: Map<number, number> = new Map<number, number>();
  let res: number[] = [];
  for (let i of nums) {
    map.set(i, (map.get(i) || 0) + 1);
  }
  for (let i = 1; i <= k; i++) {
    res.push(findMax(map));
  }
  return res;
}

// 从集合里找出最大值，返回结果并且删除该键值对
function findMax(map: Map<number, number>): number {
  let max: number = 0;
  let res = 0;
  for (let [key, value] of map.entries()) {
    if (value > max) {
      res = key;
      max = value;
    }
  }
  map.delete(res);
  return res;
}

// test
const res = topKFrequent([1, 1, 1, 2, 2, 3], 2);
console.log(res);
