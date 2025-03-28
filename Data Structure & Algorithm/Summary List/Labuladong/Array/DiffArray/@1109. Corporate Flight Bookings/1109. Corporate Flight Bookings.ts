// 1109. Corporate Flight Bookings

// There are n flights that are labeled from 1 to n.

// You are given an array of flight bookings bookings, where bookings[i] = [firsti, lasti, seatsi] represents a booking for flights firsti through lasti (inclusive) with seatsi seats reserved for each flight in the range.

// Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i.

// Example 1:
// Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
// Output: [10,55,45,25,25]
// Explanation:
// Flight labels:        1   2   3   4   5
// Booking 1 reserved:  10  10
// Booking 2 reserved:      20  20
// Booking 3 reserved:      25  25  25  25
// Total seats:         10  55  45  25  25
// Hence, answer = [10,55,45,25,25]

// Example 2:
// Input: bookings = [[1,2,10],[2,2,15]], n = 2
// Output: [10,25]
// Explanation:
// Flight labels:        1   2
// Booking 1 reserved:  10  10
// Booking 2 reserved:      15
// Total seats:         10  25
// Hence, answer = [10,25]

class DiffArray {
  diff: number[];

  constructor(nums: number[]) {
    this.diff = new Array(nums.length).fill(0);
    this.diff[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
      this.diff[i] = nums[i] - nums[i - 1];
    }
  }

  increment(i: number, j: number, val: number) {
    if (i >= this.diff.length) {
      return;
    }
    this.diff[i] += val;
    if (j + 1 < this.diff.length) {
      this.diff[j + 1] -= val;
    }
  }

  getArray(): number[] {
    const nums = new Array(this.diff.length).fill(0);
    nums[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i++) {
      nums[i] = this.diff[i] + nums[i - 1];
    }
    return nums;
  }
}

export function corpFlightBookings(bookings: number[][], n: number): number[] {
  const diff = new DiffArray(new Array(n).fill(0));

  for (const item of bookings) {
    const i = item[0] - 1;
    const j = item[1] - 1;
    const val = item[2];

    diff.increment(i, j, val);
  }

  return diff.getArray();
}

function corpFlightBookings1(bookings: number[][], n: number): number[] {
  const nums = new Array(n).fill(0);

  for (const item of bookings) {
    for (let i = item[0] - 1; i <= item[1] - 1; i++) {
      nums[i] += item[2];
    }
  }

  return nums;
}

// test
const res = corpFlightBookings(
  [
    [1, 2, 10],
    [2, 3, 20],
    [2, 5, 25],
  ],
  5
);
console.log(res);
