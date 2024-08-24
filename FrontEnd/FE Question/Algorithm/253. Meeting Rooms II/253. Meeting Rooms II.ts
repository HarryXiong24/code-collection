// 253. Meeting Rooms II

// Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

// Example 1:
// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: 2

// Example 2:
// Input: intervals = [[7,10],[2,4]]
// Output: 1

export function minMeetingRooms(intervals: number[][]): number {
  const start_time_list: number[] = intervals.map((meeting) => meeting[0]).sort((a, b) => a - b);
  const end_time_list: number[] = intervals.map((meeting) => meeting[1]).sort((a, b) => a - b);

  let start_point: number = 0;
  let end_point: number = 0;
  let rooms: number = 0;
  let maxRoom: number = 0;

  while (start_point < intervals.length) {
    if (start_time_list[start_point] < end_time_list[end_point]) {
      start_point++;
      rooms++;
    } else {
      end_point++;
      rooms--;
    }

    maxRoom = Math.max(maxRoom, rooms);
  }

  return maxRoom;
}

// test
const res1 = minMeetingRooms([
  [0, 30],
  [5, 10],
  [15, 20],
]);
console.log(res1);

const res2 = minMeetingRooms([
  [7, 10],
  [2, 4],
]);
console.log(res2);
