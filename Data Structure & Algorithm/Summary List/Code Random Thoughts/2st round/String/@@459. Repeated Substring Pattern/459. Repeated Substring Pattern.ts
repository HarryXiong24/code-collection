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

// KMP
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

  // Rules: the value that is the rest of the max prefix and the max suffix is the substring
  const substring = s.substring(0, s.length - lsp[lsp.length - 1]);

  return s !== substring && s.length % substring.length === 0 ? true : false;
}

// special rules
// Concat string s 2 times, and delete the first and the last element. If it still has a s substring in the new concat string, it means that this has a repeated substring.
export function repeatedSubstringPattern1(s: string): boolean {
  if (s.length < 2) {
    return false;
  }

  const double_s: string = s.substring(1, s.length) + s.substring(0, s.length - 1);

  return double_s.includes(s);
}

// basic method
export function repeatedSubstringPattern2(s: string): boolean {
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
const res = repeatedSubstringPattern1('abcabcabcabc');
const res1 = repeatedSubstringPattern2('bb');
console.log(res);
console.log(res1);
const res2 = repeatedSubstringPattern2('ababab');
console.log(res2);
const res3 = repeatedSubstringPattern('babbabbabbabbab');
console.log(res3);
const res4 = repeatedSubstringPattern('abac');
console.log(res4);
