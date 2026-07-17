import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

/**
 * 13 测试 —— 用 Node 内置的 `node:test` + `node:assert`，零第三方依赖。
 * 运行：npm test  （等价于先 build，再 node --test dist/tests/*.test.js）
 * 要点：
 *   1. describe / it 组织用例，assert.* 做断言。
 *   2. 表驱动：把「输入 → 期望」列成数组，循环生成用例。
 *   3. assert.throws 断言会抛错；assert.rejects 断言异步会失败。
 *   4. 三个语言项目都各带一个测试文件，横向对照测试写法。
 */

// 被测函数
function classify(n: number): 'negative' | 'zero' | 'positive' {
  if (n < 0) return 'negative';
  if (n === 0) return 'zero';
  return 'positive';
}

function divide(a: number, b: number): number {
  if (b === 0) throw new Error('division by zero');
  return a / b;
}

describe('classify', () => {
  // 表驱动测试：一张表覆盖多组输入
  const cases: Array<[number, string]> = [
    [-5, 'negative'],
    [0, 'zero'],
    [42, 'positive'],
  ];
  for (const [input, expected] of cases) {
    it(`classify(${input}) === ${expected}`, () => {
      assert.equal(classify(input), expected);
    });
  }
});

describe('divide', () => {
  it('正常相除', () => {
    assert.equal(divide(10, 2), 5);
  });

  it('除以 0 抛错', () => {
    assert.throws(() => divide(1, 0), /division by zero/);
  });

  it('异步拒绝可用 assert.rejects', async () => {
    await assert.rejects(Promise.reject(new Error('nope')), /nope/);
  });
});
