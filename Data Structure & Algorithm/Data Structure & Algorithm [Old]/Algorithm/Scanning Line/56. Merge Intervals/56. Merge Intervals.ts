// 56. Merge Intervals

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

// Example 2:
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

export function merge(intervals: number[][]): number[][] {
  const events: number[][] = [];

  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }

  events.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  const result: number[][] = [];
  let rooms = 0;
  let prevTime = -1;
  let begin = 0;

  for (let i = 0; i < events.length; i++) {
    const [time, count] = events[i];
    const nextTime = i + 1 < events.length ? events[i + 1][0] : -1;

    if (rooms === 0 && prevTime !== time) {
      begin = time;
    }

    rooms += count;
    prevTime = time;

    if (rooms === 0 && nextTime !== time) {
      result.push([begin, time]);
    }
  }

  return result;
}

// test
const res = merge([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]);
console.log(res);
