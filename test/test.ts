// const arr = [1, 2, 3, 4];

// for (let item of arr) {
//   if (item === 3) {
//     console.log('Break');
//     break;
//   }
//   console.log(item);
// }

// function* generator() {
//   console.log('111');
//   yield 123 + 789;
// }

// const fun = generator();

// console.log(fun.next());
// fun.next();
// fun.next();

// const example = new Promise((resolve) => {
//   console.log('aaa');
//   resolve('bbb');
// });

// example.then((str) => {
//   console.log(str);
// });

// function Test() {
//   console.log('1');
// }

// console.log(Test);

// const text =
//   '这是一段包含链接的文本，链接地址是：https://www.google.com 和 http://www.baidu.com ，另外还有一个链接：https://github.com/Raoul1996\n';
// const regex = /(https?:\/\/\S+)(?=\s|$)/gi;
// const links = text.match(regex);
// console.log(links); // ["https://www.google.com ", "http://www.baidu.com，", "https://github.com/Raoul1996"]

// function fib(n: number): number {
//   const recursive = (current: number): number => {
//     if (current === 0) {
//       return 0;
//     }
//     if (current === 1) {
//       return 1;
//     }
//     return recursive(current - 1) + recursive(current - 2);
//   };

//   return recursive(n);
// }

// console.log(fib(4));

function countingSort(nums: number[]): number[] {
  // find out the min value, and do a map to keep all numbers are positive
  const min = Math.min(...nums);
  let mapper = min < 0 ? Math.abs(0 - min) : 0;

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + mapper;
  }

  // counting sort beginning
  const max = Math.max(...nums);
  const countArray = new Array(max + 1).fill(0);

  // counting
  for (const item of nums) {
    countArray[item]++;
  }

  // calculate the deviate of sorted array's index
  let sum = 0;
  let temp = 0;
  for (let i = 0; i < countArray.length; i++) {
    sum = sum + temp;
    temp = countArray[i];
    countArray[i] = sum;
  }

  // get sorted array
  const sortArray = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    const index = countArray[nums[i]];
    const value = nums[i];
    sortArray[index] = value;
    countArray[nums[i]]++;
  }

  // remapping;
  for (let i = 0; i < sortArray.length; i++) {
    sortArray[i] = sortArray[i] - mapper;
  }

  return sortArray;
}

// test
const array = [2, 0, 2, 1, 1, 0, -3, -4];
const res = countingSort(array);
console.log(res);
