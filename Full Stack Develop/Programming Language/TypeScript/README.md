# TypeScript

A demonstration of TypeScript usage. Every demo prints "expression → result", so a single run shows you the real behavior of each language feature without memorizing docs.

Together with [`../Go`](../Go), [`../Python`](../Python), and [`../Rust`](../Rust) in the same directory, these are four implementations of **the same set of topics, one-to-one aligned**, making it easy to compare how these strongly typed languages differ.

## Run it

```bash
npm install

npm run dev              # compile + run all 15 demos
npm start generics async # run only the specified ones
npm test                 # run the node:test unit tests
```

Requires Node ≥ 18 (uses the built-in `node:test` and `structuredClone`). TypeScript exists only at compile time; `tsc` compiles `src/*.ts` into `dist/*.js`, and what actually runs is Node.

## Contents

| # | Demo | Name | Focus |
| --- | --- | --- | --- |
| 01 | `01-types.ts` | `types` | primitive types, `let/const`, annotation vs inference, `bigint`, `null/undefined`, `as const` |
| 02 | `02-collections.ts` | `collections` | array / tuple / `Record` / `Map` / `Set`, destructuring and spread |
| 03 | `03-functions.ts` | `functions` | default / optional / rest parameters, arrow functions, closures, higher-order functions, overloads |
| 04 | `04-control-flow.ts` | `control-flow` | `if`/ternary, `for...of`, discriminated unions + exhaustive `switch`, truthiness traps |
| 05 | `05-structs-classes-interfaces.ts` | `classes` | `interface`/`type`, `class`, access modifiers, inheritance, structural typing |
| 06 | `06-generics.ts` | `generics` | generic functions / classes, `extends` constraints, `keyof`, utility types |
| 07 | `07-error-handling.ts` | `errors` | `try/catch/finally`, custom `Error`, `Result` union type |
| 08 | `08-async.ts` | `async` | `async/await`, `Promise.all`/`allSettled`/`race`, timeout and cancellation |
| 09 | `09-advanced-types.ts` | `advanced-types` | unions/intersections, literal enums, type narrowing, type guards, mapped types |
| 10 | `10-decorators.ts` | `decorators` | TC39 standard decorators: method/class decorators, logging, memoization |
| 11 | `11-memory-references.ts` | `memory` | value vs reference, shallow copy / deep copy `structuredClone`, argument-passing semantics |
| 12 | `12-stdlib.ts` | `stdlib` | JSON, `Date`, strings, `Intl`, array/object utilities |
| 13 | `13-iterators.ts` | `iterators` | generators `function*`, `[Symbol.iterator]`, lazy infinite sequences, `yield*` |
| 14 | `14-modules.ts` | `modules` | ESM import/export, default vs named, module-private, `import type`, `import.meta` |
| 15 | `15-sorting-equality.ts` | `sorting` | comparator combinators, multi-key sorting, stability, reference equality, dedup by value-built key |
| 16 | `tests/demo.test.ts` | — | `node:test` + `node:assert`, table-driven tests (run with `npm test`) |

## Type-system highlights (also the reasons to pick TS)

- **Structural typing (duck typing)**: matching shapes are compatible, regardless of whether they come from the same declaration. This matches Go's interfaces and Python's `Protocol`, but differs from nominal-typed languages that go "by name".
- **Types exist only at compile time**: fully erased at runtime, so they don't affect performance — which also means you can't do `instanceof SomeInterface` at runtime.
- **Always enable `strict`**: `strict` + `noUncheckedIndexedAccess` in `tsconfig.json` catch the vast majority of `undefined`-class bugs at compile time.
- **Discriminated unions + `never` exhaustiveness checks**: give each union member a literal `kind`, assign to `never` in the `switch`'s `default`, and a later missing branch becomes a compile error (see `04`).

## Toolchain

| Purpose | Tool |
| --- | --- |
| Package management | `npm` (or pnpm / yarn / bun), dependencies in `package.json` |
| Compilation | `tsc` (the official TypeScript compiler), configured in `tsconfig.json` |
| Run TS directly | `tsx` / `ts-node` (this project takes the classic "compile first, then node" route) |
| Testing | built-in `node:test` (this project), or Vitest / Jest |
| Formatting / Lint | Prettier + ESLint (the repo root already has `.prettierrc`) |
