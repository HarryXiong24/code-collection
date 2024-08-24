// Make Counter

// Implement a function that returns a counter function which increases count on every call.

// const counter1 = makeCounter();
// const counter2 = makeCounter();
// counter1(); // 1
// counter1(); // 2
// counter1(); // 3
// counter2(); // 1

export const makeCounter = () => {
  let count = 0;
  const _counter = () => {
    count++;
    return count;
  };
  return _counter;
};

// test
const counter1 = makeCounter();
const counter2 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3
console.log(counter2()); // 1

// Advanced
export const makeCounterAdvanced = () => {
  let count = 0;
  return { getCurrentValue: () => count, increaseCount: () => ++count };
};

// test
const counter3 = makeCounterAdvanced();
console.log(counter3.getCurrentValue()); // 0
console.log(counter3.increaseCount()); // 1
console.log(counter3.getCurrentValue()); // 1
