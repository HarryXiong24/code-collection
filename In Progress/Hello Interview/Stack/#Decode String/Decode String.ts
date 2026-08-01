// DESCRIPTION (inspired by Leetcode.com)
// Given an encoded string, write a function to return its decoded string that follows a specific encoding rule: k[encoded_string], where the encoded_string within the brackets is repeated exactly k times. Note that k is always a positive integer. The input string is well-formed without any extra spaces, and square brackets are properly matched. Also, assume that the original data doesn't contain digits other than the ones that specify the number of times to repeat the following encoded_string.

// Inputs:
// s = "3[a2[c]]"
// Output:
// "accaccacc"

// Time Complexity: O(N)
// Space Complexity: O(N)
export class Solution {
  decodeString(s: string): string {
    let stack: (string | number)[] = [];
    let currString: string = '';
    let currentNumber: number = 0;

    for (let char of s) {
      if (char === '[') {
        // it means that we need to clear history result and calculate from beginning
        stack.push(currString);
        stack.push(currentNumber);
        currString = '';
        currentNumber = 0;
      } else if (char === ']') {
        const count = stack.pop()! as number;
        const preStr = stack.pop()! as string;
        currString = preStr + currString.repeat(count);
      } else if (/[0-9]/.test(char)) {
        // consider multi-digit numbers
        currentNumber = currentNumber * 10 + parseInt(char);
      } else {
        currString += char;
      }
    }

    return currString;
  }
}

// test
const s = '3[a2[c]]';
const res = new Solution().decodeString(s);
console.log(res);
