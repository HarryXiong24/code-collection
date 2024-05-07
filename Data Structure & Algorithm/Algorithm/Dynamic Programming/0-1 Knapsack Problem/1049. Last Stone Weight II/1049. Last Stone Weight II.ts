// 1049. Last Stone Weight II

// You are given an array of integers stones where stones[i] is the weight of the ith stone.

// We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y. The result of this smash is:

// If x == y, both stones are destroyed, and
// If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
// At the end of the game, there is at most one stone left.

// Return the smallest possible weight of the left stone. If there are no stones left, return 0.

// Example 1:
// Input: stones = [2,7,4,1,8,1]
// Output: 1
// Explanation:
// We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
// we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
// we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
// we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.

// Example 2:
// Input: stones = [31,26,33,21,40]
// Output: 5

// recursive
export function lastStoneWeightII(stones: number[]): number {
  if (stones.length === 0) {
    return 0;
  }
  if (stones.length === 1) {
    return 1;
  }

  const recursion = (currentStones: number[]): number => {
    if (currentStones.length === 0) {
      return 0;
    }
    if (currentStones.length === 1) {
      return 1;
    }

    let minWeight = Infinity;
    for (let i = 0; i < currentStones.length; i++) {
      for (let j = i + 1; j < currentStones.length; j++) {
        let newStones = [...currentStones.slice(0, i), ...currentStones.slice(i + 1, j), ...currentStones.slice(j + 1)];
        if (currentStones[i] !== currentStones[j]) {
          newStones.push(Math.abs(currentStones[i] - currentStones[j]));
        }
        let result = recursion(newStones);
        minWeight = Math.min(minWeight, result);
      }
    }

    return minWeight;
  };

  return recursion(stones);
}

// memoization
export function lastStoneWeightII_memoization(stones: number[]): number {
  if (stones.length === 0) {
    return 0;
  }
  if (stones.length === 1) {
    return 1;
  }

  const memo = new Map<string, number>();

  const recursion = (currentStones: number[]): number => {
    if (currentStones.length === 0) {
      return 0;
    }
    if (currentStones.length === 1) {
      return 1;
    }

    const key = currentStones.sort((a, b) => a - b).join(',');
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let minWeight = Infinity;
    for (let i = 0; i < currentStones.length; i++) {
      for (let j = i + 1; j < currentStones.length; j++) {
        let newStones = [...currentStones.slice(0, i), ...currentStones.slice(i + 1, j), ...currentStones.slice(j + 1)];
        if (currentStones[i] !== currentStones[j]) {
          newStones.push(Math.abs(currentStones[i] - currentStones[j]));
        }
        let result = recursion(newStones);

        minWeight = Math.min(minWeight, result);
      }
    }

    memo.set(key, minWeight);
    return minWeight;
  };

  return recursion(stones);
}

// bottom-up
export function lastStoneWeightII_bottom_up(stones: number[]): number {
  const totalSum = stones.reduce((acc, val) => acc + val, 0);
  const target = Math.floor(totalSum / 2);

  let dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (let stone of stones) {
    for (let j = target; j >= stone; j--) {
      dp[j] = dp[j] || dp[j - stone];
    }
  }

  for (let j = target; j >= 0; j--) {
    if (dp[j]) {
      return totalSum - 2 * j;
    }
  }

  return 0;
}

// test
const res = lastStoneWeightII([2, 7, 4, 1, 8, 1]);
console.log(res);
const res1 = lastStoneWeightII([2, 7, 4, 1, 8, 1]);
console.log(res1);
const res2 = lastStoneWeightII_bottom_up([2, 7, 4, 1, 8, 1]);
console.log(res2);
