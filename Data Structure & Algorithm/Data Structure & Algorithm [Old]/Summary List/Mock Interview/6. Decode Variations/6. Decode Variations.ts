// 6. Decode Variations

// A letter can be encoded to a number in the following way:

// 'A' -> '1', 'B' -> '2', 'C' -> '3', ..., 'Z' -> '26'
// A message is a string of uppercase letters, and it is encoded first using this scheme. For example, 'AZB' -> '1262'

// Given a string of digits S from 0-9 representing an encoded message, return the number of ways to decode it.

// Examples:
// input:  S = '1262'
// output: 3
// explanation: There are 3 messages that encode to '1262': 'AZB', 'ABFB', and 'LFB'.

export function decodeVariations(s: string) {
  /**
	@param S: string
	@return: integer
	*/

  const dp: number[] = new Array(s.length + 1).fill(0);

  // init
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    if (s[i - 1] !== '0') {
      dp[i] += dp[i - 1];
    }

    const temp = Number(s.slice(i - 2, i));
    if (temp >= 10 && temp <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[s.length];
}

// test
const res = decodeVariations('1262');
console.log(res);
