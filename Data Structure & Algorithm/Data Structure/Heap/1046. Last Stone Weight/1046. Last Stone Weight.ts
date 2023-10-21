// 1046. Last Stone Weight

// You are given an array of integers stones where stones[i] is the weight of the ith stone.

// We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

// If x == y, both stones are destroyed, and
// If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
// At the end of the game, there is at most one stone left.

// Return the weight of the last remaining stone. If there are no stones left, return 0.

// Example 1:
// Input: stones = [2,7,4,1,8,1]
// Output: 1
// Explanation:
// We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
// we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
// we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
// we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.

// Example 2:
// Input: stones = [1]
// Output: 1

function heapify(nums: number[], length: number, current_index: number) {
  let min_index = current_index;
  let left_index = 2 * current_index + 1;
  let right_index = 2 * current_index + 2;

  if (left_index < length && nums[min_index] > nums[left_index]) {
    min_index = left_index;
  }
  if (right_index < length && nums[min_index] > nums[right_index]) {
    min_index = right_index;
  }

  if (min_index !== current_index) {
    const temp = nums[min_index];
    nums[min_index] = nums[current_index];
    nums[current_index] = temp;
    heapify(nums, length, min_index);
  }
}

function heapSort(stones: number[]) {
  for (let i = Math.floor(stones.length / 2) - 1; i >= 0; i--) {
    heapify(stones, stones.length, i);
  }

  for (let i = stones.length - 1; i >= 0; i--) {
    const temp = stones[i];
    stones[i] = stones[0];
    stones[0] = temp;
    heapify(stones, i, 0);
  }
}

export function lastStoneWeight(stones: number[]): number {
  if (stones.length === 1) {
    return stones[0];
  }
  heapSort(stones);
  const [max, sec_max] = stones.splice(0, 2);
  stones.push(max - sec_max);

  return lastStoneWeight(stones);
}

// test
const res = lastStoneWeight([2, 7, 4, 1, 8, 1]);
console.log(res);
