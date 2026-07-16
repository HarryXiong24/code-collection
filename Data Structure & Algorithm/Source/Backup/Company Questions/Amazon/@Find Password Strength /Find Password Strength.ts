// Find Password Strength

// Find the password strength for a given password. For example, if the password is "good", then iterate over all substrings and find the distinct character counts:

// g = 1,
// o = 1,
// o = 1,
// d = 1,
// go = 2,
// oo = 1,
// od = 2,
// goo = 2,
// ood = 2,
// good = 3

// At the end, add all the distinct character counts to determine the password strength. In this case, the password strength is 16.

// Function Description
// Complete the function findPasswordStrength in the editor.
// findPasswordStrength has the following parameter:
// String password: the password string
// Returns
// int: the password strength

// Example 1:
// Input:  password = "good"
// Output: 16

export function findPasswordStrength(password: string) {
  const next: Map<string, number> = new Map(); // 用来记录当前字符下次出现的位置
  let res = 0;

  for (let i = password.length - 1; i >= 0; i--) {
    const char = password[i];
    let nextIdx = password.length; // 默认下次出现的位置是字符串末尾

    if (next.has(char)) {
      nextIdx = next.get(char)!;
    }

    // 更新当前字符的下次出现位置
    next.set(char, i);

    // 计算贡献
    res += (i + 1) * (nextIdx - i);
  }

  return res;
}

// test
const res = findPasswordStrength('good');
console.log(res);
