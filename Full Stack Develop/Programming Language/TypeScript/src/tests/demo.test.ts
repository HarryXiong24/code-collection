import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

/**
 * 13 Testing — uses Node's built-in `node:test` + `node:assert`, zero third-party dependencies.
 * Run: npm test  (equivalent to build first, then node --test dist/tests/*.test.js)
 * Key points:
 *   1. describe / it organize cases, assert.* makes assertions.
 *   2. Table-driven: list "input → expected" in an array and generate cases in a loop.
 *   3. assert.throws asserts an error is thrown; assert.rejects asserts an async failure.
 *   4. Each language project ships a test file, for comparing testing styles side by side.
 */

// functions under test
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
  // table-driven test: one table covers multiple inputs
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
  it('normal division', () => {
    assert.equal(divide(10, 2), 5);
  });

  it('dividing by 0 throws', () => {
    assert.throws(() => divide(1, 0), /division by zero/);
  });

  it('async rejection can use assert.rejects', async () => {
    await assert.rejects(Promise.reject(new Error('nope')), /nope/);
  });
});
