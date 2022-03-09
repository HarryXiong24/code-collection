/**
 * 2021.10.30
 */

// Pick
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Exclude
export type MyExclude<T, K> = T extends K ? never : T;

// Omit
export type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

// Readonly
export type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Parameters
export type MyParameters<T extends (...args: any) => any> = T extends (...args: infer K) => any ? K : never;

// ReturnType
export type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer K ? K : never;

// Includes
export type MyIncludes<T extends any[], K> = K extends T[number] ? true : false;
