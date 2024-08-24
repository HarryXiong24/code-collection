// Create a polyfill for Arrary.isArray

// 1. can finish the code?
// 2. prototype
// 3. null check before polyfill
// 4. diff between Object and Array
// 5. call/apply

export const isArray = (value: any): boolean => {
  if (!Array.isArray) {
    Array.isArray = (arg: any[]): arg is any[] => {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  return Array.isArray(value);
};

// test
const res1 = isArray([0, 1, 2]);
const res2 = isArray({});
const res3 = isArray(5);
console.log(res1);
console.log(res2);
console.log(res3);
