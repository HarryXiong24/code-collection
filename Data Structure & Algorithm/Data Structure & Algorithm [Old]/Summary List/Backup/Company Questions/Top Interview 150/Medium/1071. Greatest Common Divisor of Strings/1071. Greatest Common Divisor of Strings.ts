// 1071. Greatest Common Divisor of Strings

// For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).

// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

// Example 1:
// Input: str1 = "ABCABC", str2 = "ABC"
// Output: "ABC"

// Example 2:
// Input: str1 = "ABABAB", str2 = "ABAB"
// Output: "AB"

// Example 3:
// Input: str1 = "LEET", str2 = "CODE"
// Output: ""

export function gcdOfStrings(str1: string, str2: string): string {
  const len1 = str1.length;
  const len2 = str2.length;

  const valid = (k: number): boolean => {
    if (len1 % k !== 0 || len2 % k !== 0) {
      return false;
    }
    const n1 = len1 / k;
    const n2 = len2 / k;
    const base = str1.substring(0, k);
    return str1 === base.repeat(n1) && str2 === base.repeat(n2);
  };

  for (let i = Math.min(len1, len2); i > 0; i--) {
    if (valid(i)) {
      return str1.substring(0, i);
    }
  }
  return '';
}

// T: O(n)
// S: O(1)
export function gcdOfStrings1(str1: string, str2: string): string {
  const gcd = (x: number, y: number): number => {
    if (y === 0) {
      return x;
    } else {
      return gcd(y, x % y);
    }
  };

  // Check if they have non-zero GCD string.
  if (str1 + str2 !== str2 + str1) {
    return '';
  }

  // Get the GCD of the two lengths.
  const gcdLength = gcd(str1.length, str2.length);
  return str1.substring(0, gcdLength);
}

// test
const res1 = gcdOfStrings('ABABABAB', 'ABAB');
const res2 = gcdOfStrings('ABABABAB', 'ABAB');
console.log(res1);
console.log(res2);
