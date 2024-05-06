// Given a set of positive numbers arr and a value total, determine if there exists a subset in the given set whose sum is equal to total. A subset can be an empty set, or it can either consist of some elements of the set or all the elements of the set.

// Let’s say you are given a set = {1, 2, 3, 7} and a total = 6. The output will be TRUE as the subset = {1, 2, 3} adds up to make the desired total (1+2+3) = 6.

function subsetSum(arr: number[], total: number) {
  const dp: (boolean | null)[][] = new Array(arr.length + 1).fill(false).map(() => new Array(total + 1).fill(false));

  // base cases
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < total; j++) {
      if (i == 0) {
        dp[i][j] = false;
      }
      if (j == 0) {
        dp[i][j] = true;
      }
    }
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      // if last element is greater than total we ignore it
      if (arr[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      }

      // otherwise we include it and proceed on
      else {
        dp[i][j] = dp[i - 1][j - arr[i - 1]];
      }
    }
  }

  return dp[arr.length][total];
}

// test
function test() {
  let input_arr = [
    [3, 5, 8],
    [2, 4, 7],
    [2, 3, 5],
    [1, 2, 3, 7],
    [10, 20, 23, 34],
  ];
  let total = [13, 8, 5, 6, 57];

  let result;
  for (let i = 0; i < total.length; i++) {
    if (subsetSum(input_arr[i], total[i]) == true) {
      result = 'Yes.';
    } else {
      result = 'No.';
    }
    console.log(i + 1 + '.\tDoes a subset of [' + input_arr[i].join(', ') + '] sum up to ' + total[i] + '?   ', result);
    console.log('-'.repeat(100));
  }
}

test();
