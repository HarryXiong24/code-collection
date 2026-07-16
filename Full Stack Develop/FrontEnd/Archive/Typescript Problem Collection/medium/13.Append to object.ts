// Append to object

/**
 * Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field
 */

// solution
export type AppendToObject<T extends {}, U extends string, V extends any> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

// test
type Test = { id: '1' };
type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
