// 1 Hello World

/**
 * Hello, World!
 * In Type Challenges, we use the type system itself to do the assertion.
 * For this challenge, you will need to change the following code to make the tests pass.
 * expected to be string:
 * type HelloWorld = any
 * you should make this work:
 * type test = Expect<Equal<HelloWorld, string>>
 */

// solution
export type HelloWorld = string;
