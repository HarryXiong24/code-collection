// 380. Insert Delete GetRandom O(1)

// Implement the RandomizedSet class:
// RandomizedSet() Initializes the RandomizedSet object.
// bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
// bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
// int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
// You must implement the functions of the class such that each function works in average O(1) time complexity.

// Example 1:
// Input
// ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
// [[], [1], [2], [2], [], [1], [2], []]
// Output
// [null, true, false, true, 2, true, false, 2]
// Explanation
// RandomizedSet randomizedSet = new RandomizedSet();
// randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
// randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
// randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
// randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
// randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
// randomizedSet.insert(2); // 2 was already in the set, so return false.
// randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

export class RandomizedSet {
  set: number[] = [];

  constructor() {
    this.set = [];
  }

  insert(val: number): boolean {
    if (this.set.includes(val)) {
      return false;
    } else {
      this.set.push(val);
      return true;
    }
  }

  remove(val: number): boolean {
    const index = this.set.indexOf(val);
    if (index >= 0) {
      this.set.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  getRandom(): number {
    // easy method
    // return this.list[Math.floor(Math.random() * this.set.length)];

    const randomIndex = this.randomNum(0, this.set.length - 1);
    return this.set[randomIndex];
  }

  // 生成从 minNum 到 maxNum 的随机数
  private randomNum(minNum: number, maxNum: number) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1 + '', 10);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum + '', 10);
      default:
        return 0;
    }
  }
}

// test
const randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
