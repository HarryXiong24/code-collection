// 5 Tuple to Object

/**
 * Give an array, transform into an object type and the key/value must in the given array.
 */

// solution
export type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P;
};

// test
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const result: TupleToObject<typeof tuple> = {
  tesla: 'tesla',
  'model 3': 'model 3',
  'model X': 'model X',
  'model Y': 'model Y',
};
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }
