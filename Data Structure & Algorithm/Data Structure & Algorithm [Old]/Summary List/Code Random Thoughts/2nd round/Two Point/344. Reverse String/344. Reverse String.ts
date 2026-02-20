// 344. Reverse String

// Write a function that reverses a string. The input string is given as an array of characters s.
// You must do this by modifying the input array in-place with O(1) extra memory.

// Example 1:
// Input: s = ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]

// Example 2:
// Input: s = ["H","a","n","n","a","h"]
// Output: ["h","a","n","n","a","H"]

// Two Point
/**
 Do not return anything, modify s in-place instead.
 */
export function reverseString(s: string[]): void {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;

    left++;
    right--;
  }
}

// Recursive
export function reverseString1(s: string[]): void {
  const recursive = (currentIndex: number): number => {
    if (currentIndex >= s.length - 1) {
      return s.length - 1;
    }

    const lastOrderIndex = recursive(currentIndex + 1);
    const current = s[currentIndex];
    for (let i = lastOrderIndex; i < s.length; i++) {
      s[i - 1] = s[i];
    }
    s[s.length - 1] = current;
    return lastOrderIndex - 1;
  };

  recursive(0);
}

// test
const str = ['h', 'e', 'l', 'l', 'o'];
reverseString1(str);
console.log(str);
