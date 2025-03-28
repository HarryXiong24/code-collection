export class DiffArray {
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

// test
const res = new DiffArray([8, 2, 6, 3, 1]);
console.log(res.diff); // [ 8, -6, 4, -3, -2 ]
res.increment(1, 3, 10);
console.log(res.getArray()); // [ 8, 12, 16, 13, 1 ]
