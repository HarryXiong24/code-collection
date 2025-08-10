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
  const strArr: string[] = s.trim().split('');

  const removeExtraSpace = (arr: string[]) => {
    let slow = 0;
    let fast = 0;

    while (fast < arr.length) {
      arr[slow] = arr[fast];
      slow++;

      if (arr[fast] === ' ') {
        while (fast + 1 < arr.length && arr[fast] === arr[fast + 1]) {
          fast++;
        }
      }

      fast++;
    }

    arr.length = slow;
  };

  const reverse = (arr: string[], left: number, right: number) => {
    while (left < right) {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  };

  removeExtraSpace(strArr);
  reverse(strArr, 0, strArr.length - 1);

  let slow = 0;
  let fast = 0;

  while (fast < strArr.length) {
    if (strArr[fast] === ' ') {
      reverse(strArr, slow, fast - 1);
      slow = fast + 1;
    }
    fast++;
  }

  reverse(strArr, slow, fast - 1);

  return strArr.join('');
}

// test
const res = reverseWords('the   sky   is   blue');
console.log(res);
