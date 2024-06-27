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

  const lsp: number[] = [];
  let j = 0;
  lsp[0] = 0;

  for (let i = 1; i < s.length; i++) {
    while (j > 0 && s[i] !== s[j]) {
      j = lsp[j - 1];
    }
    if (s[j] === s[i]) {
      j++;
    }
    lsp[i] = j;
  }

  const substring = s.substring(0, s.length - lsp[lsp.length - 1]);

  return s !== substring && s.length % substring.length === 0 ? true : false;
}

// test
const res = repeatedSubstringPattern('abcabcabcabc');
console.log(res);
