export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Initialize the target based on whether it's an array or an object
  const cloneTarget = Array.isArray(obj) ? ([] as T) : ({} as T);

  // Only iterate over object's own properties
  for (const key of Object.keys(obj)) {
    const value = (obj as any)[key];
    (cloneTarget as any)[key] = deepClone(value);
  }

  return cloneTarget;
}

// test
const res = deepClone({
  field1: 1,
  field2: undefined,
  field3: {
    child: ['child', { grandson: 'grandson' }],
  },
  field4: [2, 4, 8],
});
console.log(res);
