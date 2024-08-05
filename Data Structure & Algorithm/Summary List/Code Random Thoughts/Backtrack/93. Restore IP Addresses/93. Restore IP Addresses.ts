// 93. Restore IP Addresses

// A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

// For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
// Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

// Example 1:
// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]

// Example 2:
// Input: s = "0000"
// Output: ["0.0.0.0"]

// Example 3:
// Input: s = "101023"
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

export function restoreIpAddresses(s: string): string[] {
  const results: string[] = [];

  const isValid = (value: string): boolean => {
    if (value.length > 1 && value[0] === '0') {
      return false;
    }

    if (Number(value) >= 0 && Number(value) <= 255) {
      return true;
    }
    return false;
  };

  const backtrack = (start_index: number, path: string[]) => {
    if (start_index >= s.length && path.length === 4) {
      results.push([...path].join('.'));
      return;
    }

    for (let i = start_index; i < s.length; i++) {
      if (!isValid(s.slice(start_index, i + 1))) {
        continue;
      }
      path.push(s.slice(start_index, i + 1));
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

// test
const res = restoreIpAddresses('25525511135');
console.log(res);
