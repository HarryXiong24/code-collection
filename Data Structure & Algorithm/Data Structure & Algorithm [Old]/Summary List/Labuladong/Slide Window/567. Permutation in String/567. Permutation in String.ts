// 567. Permutation in String

// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

// In other words, return true if one of s1's permutations is the substring of s2.

// Example 1:
// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

// Example 2:
// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false

export function checkInclusion(s1: string, s2: string): boolean {
  const need = new Map();
  const window = new Map();
  for (const char of s1) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  while (right < s2.length) {
    const char = s2[right];
    right++;

    // perform a series of updates within the window
    if (need.has(char)) {
      window.set(char, (window.get(char) || 0) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }

    // determine whether the left side of the window needs to shrink
    while (right - left >= s1.length) {
      // here determine if a valid substring is found
      if (valid === need.size) {
        return true;
      }
      const char = s2[left];
      left++;
      // perform a series of updates within the window
      if (need.has(char)) {
        if (window.get(char) === need.get(char)) {
          valid--;
        }
        window.set(char, window.get(char) - 1);
      }
    }
  }

  // no substring found that meets the criteria
  return false;
}

// test
const res = checkInclusion('ab', 'eidbaooo');
console.log(res);
