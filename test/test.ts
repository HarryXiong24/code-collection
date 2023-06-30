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

function customizedCountingSort(nums: number[], digit: number, count_volume = 10): void {
  // we just need 0-9 space in counter volume
  const countArray = new Array(count_volume).fill(0);

  for (const item of nums) {
    const current_digit = Math.floor(item / digit) % 10;
    countArray[current_digit]++;
  }

  // calculate the deviation of index in sorted array
  let sum = 0;
  let temp = 0;
  for (let i = 0; i < countArray.length; i++) {
    sum = sum + temp;
    temp = countArray[i];
    countArray[i] = sum;
  }

  const sortedArray = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    // here is important and notice the mapping relationship between current_digit and nums[i]
    const current_digit = Math.floor(nums[i] / digit) % 10;
    const index = countArray[current_digit];
    const value = nums[i];
    sortedArray[index] = value;
    countArray[current_digit]++;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = sortedArray[i];
  }
}

function radixSort(nums: number[]) {
  // mapping
  const min = Math.min(...nums);
  const mapper = min < 0 ? Math.abs(0 - min) : 0;

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + mapper;
  }

  let digit = 1;
  const max = Math.max(...nums);
  // represents use Counting Sort in every digital number round
  while (digit <= max) {
    customizedCountingSort(nums, digit, 10);
    digit = digit * 10;
  }

  // remapping
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] - mapper;
  }
}

// test
const array = [831, 443, 256, 336, 736, 907, 3, 21323, 54];
radixSort(array);
console.log(array);
