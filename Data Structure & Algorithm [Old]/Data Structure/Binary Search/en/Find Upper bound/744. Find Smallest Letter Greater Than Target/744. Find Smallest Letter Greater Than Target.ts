// 744. Find Smallest Letter Greater Than Target

// You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

// Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

// Example 1:
// Input: letters = ["c","f","j"], target = "a"
// Output: "c"
// Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

// Example 2:
// Input: letters = ["c","f","j"], target = "c"
// Output: "f"
// Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

// Example 3:
// Input: letters = ["x","x","y","y"], target = "z"
// Output: "x"
// Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].

export function nextGreatestLetter(letters: string[], target: string): string {
  let left = 0;
  let right = letters.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (letters[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left < letters.length) {
    return letters[left];
  } else {
    return letters[0];
  }
}

// test
const res = nextGreatestLetter(['x', 'x', 'y', 'y'], 'y');
console.log(res);
