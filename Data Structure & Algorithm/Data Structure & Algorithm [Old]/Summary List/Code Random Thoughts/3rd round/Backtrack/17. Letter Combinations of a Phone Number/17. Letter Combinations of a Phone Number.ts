// 17. Letter Combinations of a Phone Number

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// Example 1:
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Example 2:
// Input: digits = ""
// Output: []

// Example 3:
// Input: digits = "2"
// Output: ["a","b","c"]

export function letterCombinations(digits: string): string[] {
  const map = new Map([
    ['2', ['a', 'b', 'c']],
    ['3', ['d', 'e', 'f']],
    ['4', ['g', 'h', 'i']],
    ['5', ['j', 'k', 'l']],
    ['6', ['m', 'n', 'o']],
    ['7', ['p', 'q', 'r', 's']],
    ['8', ['t', 'u', 'v']],
    ['9', ['w', 'x', 'y', 'z']],
  ]);

  if (digits.length === 0) {
    return [];
  }

  const results: string[] = [];

  const backtrack = (start_index: number, path: string[]) => {
    if (path.length === digits.length) {
      results.push(path.join(''));
      return;
    }

    const current = map.get(digits[start_index])!;
    for (let i = 0; i < current.length; i++) {
      path.push(current[i]);
      backtrack(start_index + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

// test
const res = letterCombinations('23');
console.log(res);
