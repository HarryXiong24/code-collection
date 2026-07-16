// 253. Meeting Rooms II

// 给定一个会议时间安排的数组 intervals，每个会议时间包含开始时间和结束时间 intervals[i] = [starti, endi]。

// 请你计算 至少 需要 多少间会议室，才能容纳这些会议安排。

// 示例 1

// 输入：
// [[0, 30], [5, 10], [15, 20]]
// 输出：
// 2

// 解释：

// 会议 [0, 30] 与会议 [5, 10] 重叠

// 需要两个会议室

// 示例 2

// 输入：
// [[7,10],[2,4]]
// 输出：
// 1

export function minMeetingRooms(intervals: number[][]): number {
  const events: number[][] = [];

  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }

  events.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]; // 结束事件（-1）排在开始事件（1）前面
    }
    return a[0] - b[0];
  });

  let rooms = 0;
  let maxRooms = 0;

  for (const [_, range] of events) {
    rooms += range;
    maxRooms = Math.max(maxRooms, rooms);
  }

  return maxRooms;
}

// test
const res = minMeetingRooms([
  [0, 30],
  [5, 10],
  [15, 20],
]);
console.log(res);
