// 264. Ugly Number II

// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

// Given an integer n, return the nth ugly number.

// Example 1:
// Input: n = 10
// Output: 12
// Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.

// Example 2:
// Input: n = 1
// Output: 1
// Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.

export function nthUglyNumber(n: number): number {
  // 可以理解为三个指向有序链表头结点的指针
  let p2 = 1;
  let p3 = 1;
  let p5 = 1;

  // 可以理解为三个有序链表的头节点的值
  let product2 = 1;
  let product3 = 1;
  let product5 = 1;

  // 可以理解为最终合并的有序链表（结果链表）
  let ugly = new Array(n + 1);
  // 可以理解为结果链表上的指针
  let p = 1;

  // 开始合并三个有序链表
  while (p <= n) {
    // 取三个链表的最小结点
    const min = Math.min(Math.min(product2, product3), product5);
    // 接到结果链表上
    ugly[p] = min;
    p++;
    // 前进对应有序链表上的指针，这里同时可以保证去重
    if (min == product2) {
      product2 = 2 * ugly[p2];
      p2++;
    }
    if (min == product3) {
      product3 = 3 * ugly[p3];
      p3++;
    }
    if (min == product5) {
      product5 = 5 * ugly[p5];
      p5++;
    }
  }

  // 返回第 n 个丑数
  return ugly[n];
}

// Time Limit Exceeded
function nthUglyNumber_Bad(n: number): number {
  const result: number[] = [];
  let num = 1;

  const checkPrime = (num: number): boolean => {
    let temp = num;

    if (temp <= 0) {
      return false;
    }

    while (temp !== 1) {
      if (temp % 2 === 0) {
        temp = temp / 2;
      } else if (temp % 3 === 0) {
        temp = temp / 3;
      } else if (num % 5 === 0) {
        temp = temp / 5;
      } else {
        return false;
      }
    }

    return true;
  };

  while (result.length < n) {
    if (num === 1 || checkPrime(num)) {
      result.push(num);
    }
    num++;
  }

  return result[result.length - 1];
}

// test
const res = nthUglyNumber(10);
console.log(res);
