// 459. Repeated Substring Pattern

// Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

// Example 1:
// Input: s = "abab"
// Output: true
// Explanation: It is the substring "ab" twice.

// Example 2:
// Input: s = "aba"
// Output: false

// Example 3:
// Input: s = "abcabcabcabc"
// Output: true
// Explanation: It is the substring "abc" four times or the substring "abcabc" twice.

export function repeatedSubstringPattern(s: string): boolean {
  if (s.length < 2) {
    return false;
  }

  const checkRepeat = (s: string, substr: string) => {
    const length = substr.length;

    for (let i = 0; i < s.length; i = i + length) {
      const temp = s.substring(i, i + length);
      if (temp !== substr) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < s.length / 2; i++) {
    const substr = s.substring(0, i + 1);

    if (checkRepeat(s, substr)) {
      return true;
    }
  }

  return false;
}

// test
const res = repeatedSubstringPattern('abcabcabcabc');
const res1 = repeatedSubstringPattern('bb');
const res2 = repeatedSubstringPattern('ababab');
console.log(res);
console.log(res1);
console.log(res2);
const res4 = repeatedSubstringPattern('babbabbabbabbab');
console.log(res4);
