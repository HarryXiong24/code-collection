// 151. Reverse Words in a String

// Given an input string s, reverse the order of the words.

// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

// Return a string of the words in reverse order concatenated by a single space.

// Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

// Example 1:
// Input: s = "the sky is blue"
// Output: "blue is sky the"

// Example 2:
// Input: s = "  hello world  "
// Output: "world hello"
// Explanation: Your reversed string should not contain leading or trailing spaces.

// Example 3:
// Input: s = "a good   example"
// Output: "example good a"
// Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

export function reverseWords(s: string): string {
  let strArr: string[] = s.trim().split('');

  const removeExtraSpace = (s: string[]) => {
    let fast = 0;
    let slow = 0;

    while (fast < s.length) {
      if (s[fast] === ' ' && s[fast - 1] === ' ') {
        fast++;
        continue;
      }
      s[slow] = s[fast];
      slow++;
      fast++;
    }

    s.length = slow;
  };

  const swap = (s: string[], start: number, end: number) => {
    let left = start;
    let right = end;

    while (left < right) {
      const temp = s[left];
      s[left] = s[right];
      s[right] = temp;
      left++;
      right--;
    }
  };

  removeExtraSpace(strArr);
  strArr.reverse();

  let right = 0;
  let left = 0;

  while (right < strArr.length) {
    right = left;
    while (strArr[right] !== ' ' && right < strArr.length) {
      right++;
      continue;
    }

    swap(strArr, left, right - 1);
    left = right + 1;
  }

  return strArr.join('');
}

// test
const res = reverseWords('the sky is blue');
console.log(res);
