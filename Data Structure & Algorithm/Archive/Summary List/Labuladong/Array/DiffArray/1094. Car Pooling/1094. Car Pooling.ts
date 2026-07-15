// 1094. Car Pooling

// There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

// You are given the integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.

// Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.

// Example 1:
// Input: trips = [[2,1,5],[3,3,7]], capacity = 4
// Output: false

// Example 2:
// Input: trips = [[2,1,5],[3,3,7]], capacity = 5
// Output: true

// Constraints: 1 <= trips.length <= 1000;
// trips[i].length == 3;
// 1 <= numPassengersi <= 100;
// 0 <= fromi < toi <= 1000;
// 1 <= capacity <= 105;

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

  checkCapacity(capacity: number): boolean {
    const nums = new Array(this.diff.length).fill(0);
    nums[0] = this.diff[0];
    if (this.diff[0] > capacity) {
      return false;
    }
    for (let i = 1; i < this.diff.length; i++) {
      nums[i] = this.diff[i] + nums[i - 1];
      if (nums[i] > capacity) {
        return false;
      }
    }
    return true;
  }
}

export function carPooling(trips: number[][], capacity: number): boolean {
  const diff = new DiffArray(new Array(1001).fill(0)); //  1 <= trips.length <= 1000;

  for (const trip of trips) {
    const i = trip[1];
    const j = trip[2] - 1;
    const val = trip[0];

    diff.increment(i, j, val);

    if (!diff.checkCapacity(capacity)) {
      return false;
    }
  }

  return true;
}

// 0 0 0 0 0 0 0
// 2 0 0 0 0 -2 0
// 2 0 3 0 0 -2 0 -> 2 2 5

// test
const res = carPooling(
  [
    [2, 1, 5],
    [3, 5, 7],
  ],
  4
);
console.log(res);
