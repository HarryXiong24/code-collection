// Given a set of positive numbers arr and a value total, determine if there exists a subset in the given set whose sum is equal to total. A subset can be an empty set, or it can either consist of some elements of the set or all the elements of the set.

// Let’s say you are given a set = {1, 2, 3, 7} and a total = 6. The output will be TRUE as the subset = {1, 2, 3} adds up to make the desired total (1+2+3) = 6.

export function subsetSum(arr: number[], total: number) {
  const recursive = (arr: number[], total: number, n: number): boolean => {
    // Base Cases
    if (total == 0) {
      return true;
    }

    if (total < 0 || n < 0) {
      return false;
    }

    // Recursive calls
    if (arr[n] > total) {
      return recursive(arr, total, n - 1);
    }

    // we either exclude the element or include the element
    return recursive(arr, total, n - 1) || recursive(arr, total - arr[n], n - 1);
  };

  return recursive(arr, total, arr.length - 1);
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
