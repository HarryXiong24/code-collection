// 253. Meeting Rooms II

// Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

// Example 1:
// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: 2

// Example 2:
// Input: intervals = [[7,10],[2,4]]
// Output: 1

export function minMeetingRooms(intervals: number[][]): number {
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  console.log(intervals);

  const meetRooms: number[] = [];
  let count = 0;

  for (let i = 0; i < intervals.length; i++) {
    let flag = false;
    for (let j = 0; j < meetRooms.length; j++) {
      if (meetRooms[j] <= intervals[i][0]) {
        meetRooms[j] = intervals[i][1];
        flag = true;
        break;
      }
    }
    if (flag === false) {
      meetRooms.push(intervals[i][1]);
      count++;
    }
  }

  return count;
}

// test
const res = minMeetingRooms([
  [0, 30],
  [5, 10],
  [15, 20],
]);
const res1 = minMeetingRooms([
  [1293, 2986],
  [848, 3846],
  [4284, 5907],
  [4466, 4781],
  [518, 2918],
  [300, 5870],
]);
console.log(res);
console.log(res1);
