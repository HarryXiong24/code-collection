// 771. Jewels and Stones

// You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.
// Letters are case sensitive, so "a" is considered a different type of stone from "A".

// Example 1:
// Input: jewels = "aA", stones = "aAAbbbb"
// Output: 3

// Example 2:
// Input: jewels = "z", stones = "ZZ"
// Output: 0

export function numJewelsInStones(jewels: string, stones: string): number {
  const jewelSet = new Set();
  let count = 0;

  for (let item of jewels) {
    jewelSet.add(item);
  }

  for (let item of stones) {
    if (jewelSet.has(item)) {
      count++;
    }
  }

  return count;
}

// test
const jewels = 'aA';
const stones = 'aAAbbbb';
const res = numJewelsInStones(jewels, stones);
console.log(res);
