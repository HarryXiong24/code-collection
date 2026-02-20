// 170. Two Sum III - Data structure design

// Design a data structure that accepts a stream of integers and checks if it has a pair of integers that sum up to a particular value.

// Implement the TwoSum class:
// TwoSum() Initializes the TwoSum object, with an empty array initially.
// void add(int number) Adds number to the data structure.
// boolean find(int value) Returns true if there exists any pair of numbers whose sum is equal to value, otherwise, it returns false.

// Example 1:
// Input
// ["TwoSum", "add", "add", "add", "find", "find"]
// [[], [1], [3], [5], [4], [7]]
// Output
// [null, null, null, null, true, false]
// Explanation
// TwoSum twoSum = new TwoSum();
// twoSum.add(1);   // [] --> [1]
// twoSum.add(3);   // [1] --> [1,3]
// twoSum.add(5);   // [1,3] --> [1,3,5]
// twoSum.find(4);  // 1 + 3 = 4, return true
// twoSum.find(7);  // No two integers sum up to 7, return false

export class TwoSum {
  array: number[];
  set: Set<number>;

  constructor() {
    this.array = [];
    this.set = new Set<number>();
  }

  add(number: number): void {
    for (let i = 0; i < this.array.length; i++) {
      const sum = this.array[i] + number;
      if (!this.set.has(sum)) {
        this.set.add(sum);
      }
    }
    this.array.push(number);
  }

  find(value: number): boolean {
    return this.set.has(value);
  }
}

// better
export class TwoSum_Better {
  map: Map<number, number>;

  constructor() {
    this.map = new Map<number, number>();
  }

  add(number: number): void {
    if (this.map.has(number)) {
      const count = this.map.get(number)!;
      this.map.set(number, count + 1);
    } else {
      this.map.set(number, 1);
    }
  }

  find(value: number): boolean {
    for (const item of this.map.keys()) {
      const rest = value - item;
      if (rest < 0) {
        continue;
      }

      if (this.map.has(rest)) {
        if (rest === item) {
          if (this.map.get(rest)! - 1 > 0) {
            return true;
          }
        } else {
          return true;
        }
      }
    }

    return false;
  }
}
