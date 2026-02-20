// 125. Valid Palindrome

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.

// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.

// Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

export function isPalindrome(s: string): boolean {
  const newS: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (/[a-zA-Z0-9]/.test(c)) {
      newS.push(c.toLowerCase());
    }
  }

  s = newS.join('');
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s.charAt(left) !== s.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// test
const res = isPalindrome('A man, a plan, a canal: Panama');
console.log(res);
