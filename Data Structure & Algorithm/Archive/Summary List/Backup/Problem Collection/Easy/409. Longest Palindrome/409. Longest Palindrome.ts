// 409. Longest Palindrome

// Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

// Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

// Example 1:
// Input: s = "abccccdd"
// Output: 7
// Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.

// Example 2:
// Input: s = "a"
// Output: 1
// Explanation: The longest palindrome that can be built is "a", whose length is 1.

// Find out the rules, the longest palindrome must contain all letters that appear an even number of times, and minus one from the number of letters that appear an odd number of times. And if it has odd number of occurences, final result will add 1.
// Time Complexity: O(N)
// Space Complexity: O(N)
export function longestPalindrome(s: string): number {
  const map = new Map<string, number>();

  for (const item of s) {
    if (map.has(item)) {
      const temp = map.get(item)!;
      map.set(item, temp + 1);
    } else {
      map.set(item, 1);
    }
  }

  let res: number = 0;
  let max_letters_odd_flag = 0;
  for (const value of map.values()) {
    if (value % 2 === 0) {
      res = res + value;
    }
    if (value % 2 === 1) {
      if (value !== 1) {
        res = res + value - 1;
      }
      max_letters_odd_flag = 1;
    }
  }

  return max_letters_odd_flag ? res + 1 : res;
}

// Optimize
// For each letter, say it occurs v times. We know we have v // 2 * 2 letters that can be partnered for sure. For example, if we have 'aaaaa', then we could have 'aaaa' partnered, which is 5 // 2 * 2 = 4 letters partnered.
// At the end, if there was any v % 2 == 1, then that letter could have been a unique center. Otherwise, every letter was partnered.
// To perform this check, we will check for v % 2 == 1 and ans % 2 == 0, the latter meaning we haven't yet added a unique center to the answer.
// Time Complexity: O(N)
// Space Complexity: O(N)
export function longestPalindrome1(s: string): number {
  const map = new Map<string, number>();

  for (const item of s) {
    if (map.has(item)) {
      const temp = map.get(item)!;
      map.set(item, temp + 1);
    } else {
      map.set(item, 1);
    }
  }

  let ans = 0;
  for (const item of map.values()) {
    ans += Math.floor(item / 2) * 2;
    if (ans % 2 === 0 && item % 2 === 1) {
      ans++;
    }
  }
  return ans;
}

// test
const res = longestPalindrome(
  'civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth'
);
console.log(res);
