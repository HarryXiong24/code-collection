// 22. Generate Parentheses

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]

// Example 2:
// Input: n = 1
// Output: ["()"]

// Time Out
export function generateParenthesis(n: number): string[] {
  const results = new Set<string>();
  const result: string[] = [];
  const array = new Array(n).fill('(').concat(new Array(n).fill(')'));
  const used: boolean[] = [];

  const isValidParentheses = (str: string): boolean => {
    const stack: string[] = [];
    const map = new Map([['(', ')']]);

    if (str.length % 2 !== 0) {
      return false;
    }

    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        stack.push(str[i]);
      }
      if (str[i] === ')') {
        const last = stack.pop()!;
        if (map.get(last) !== str[i]) {
          return false;
        }
      }
    }

    return true;
  };

  const backTrack = (used: boolean[], result: string[]) => {
    if (result.length === array.length) {
      const str = [...result].join('');
      if (!results.has(str) && isValidParentheses(str)) {
        results.add(str);
      }
      return;
    }
    for (let i = 0; i < array.length; i++) {
      if (used[i] === true) {
        continue;
      }
      result.push(array[i]);
      used[i] = true;
      backTrack(used, result);
      result.pop();
      used[i] = false;
    }
  };

  backTrack(used, result);

  return [...results];
}

// optimize
export function generateParenthesis_optimize(n: number): string[] {
  const ans: string[] = [];

  const backtrack = (S: string[], left: number, right: number): void => {
    if (S.length === 2 * n) {
      ans.push(S.join(''));
      return;
    }

    if (left < n) {
      S.push('(');
      backtrack(S, left + 1, right);
      S.pop();
    }

    if (right < left) {
      S.push(')');
      backtrack(S, left, right + 1);
      S.pop();
    }
  };

  backtrack([], 0, 0);
  return ans;
}

// test
const res = generateParenthesis_optimize(6);
console.log(res);
