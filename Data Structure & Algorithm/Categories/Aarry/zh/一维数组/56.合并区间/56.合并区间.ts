// 56 合并区间

/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间
 */

export function merge(intervals: number[][]): number[][] {
  // 当只有 0 或 1 个元素时，直接返回
  if (intervals.length === 0 || intervals.length === 1) {
    return intervals;
  }
  // 先让 left 升序, right 也升序
  intervals = intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  let [left, right] = [intervals[0][0], intervals[0][1]];
  let res: number[][] = [];

  for (let i = 1; i < intervals.length; i++) {
    const item = intervals[i];
    if (right < item[0]) {
      res.push([left, right]);
      left = item[0];
      right = item[1];
    } else {
      left = Math.min(left, item[0]);
      right = Math.max(right, item[1]);
    }
  }
  // 最后别忘了把最后一个区间也要 push 进去
  res.push([left, right]);

  return res;
}

// test
const res1 = merge([
  [1, 3],
  [2, 6],
  [8, 10],
  [9, 18],
]);
const res2 = merge([
  [4, 5],
  [1, 4],
]);
const res3 = merge([
  [1, 4],
  [2, 3],
]);
console.log(res1);
console.log(res2);
console.log(res3);
