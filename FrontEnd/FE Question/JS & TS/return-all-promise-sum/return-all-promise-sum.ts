// Question: Given an array of promises that resolves to a number, Write a function that returns a promise of the sum of those promises. If all promises are rejected, then the promise should return a rejected value of 0.

// const returnPromises = (promises) => {
// }

// Example 1:
// const arr = [Promise.resolve(3), Promise.resolve(2), Promise.resolve(6), Promise.reject(3)]
// returnPromises.then(data => console.log(data))    11

// Example 2:
// const arr1 = [Promise.reject(3), Promise.reject(2), Promise.reject(6), Promise.reject(3)];
// returnPromises.catch(err => console.log(err))    0

export const returnPromises = (promises: Promise<number>[]) => {
  let sum = 0;

  return Promise.allSettled(promises).then((results) => {
    let flag = false;
    for (const result of results) {
      if (result.status === 'fulfilled') {
        sum += result.value;
        flag = true;
      }
    }

    if (!flag) {
      return Promise.reject(0);
    }

    return Promise.resolve(sum);
  });
};

// test
const arr = [Promise.resolve(3), Promise.resolve(2), Promise.resolve(6), Promise.reject(3)];
returnPromises(arr).then((data) => console.log(data));

const arr1 = [Promise.reject(3), Promise.reject(2), Promise.reject(6), Promise.reject(3)];
returnPromises(arr1).catch((err) => console.log(err));

// reference
export const returnPromisesReference = (promises: Promise<number>[]) => {
  return new Promise((resolve, reject) => {
    let sum = 0;
    let count = 0;
    return Promise.allSettled(promises).then((results) => {
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          sum += result.value;
          count++;
        }
      });

      if (count === 0) {
        reject(0);
      } else {
        resolve(sum);
      }
    });
  });
};
