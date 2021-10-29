// 12 Includes

/**
 * Implement the JavaScript Array.includes function in the type system.
 * A type takes the two arguments. The output should be a boolean true or false.
 */

// solution

// 要使用 K extends T[number]，不能使用 K in T
export type MyIncludes<T extends any[], K> = K extends T[number] ? true : false;

// test

type isPillarMen = MyIncludes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
