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

// function bucketSort(nums: number[], bucket_number: number): void {
//   // mapping
//   const min = Math.min(...nums);
//   const mapper = min < 0 ? Math.abs(0 - min) : 0;

//   for (let i = 0; i < nums.length; i++) {
//     nums[i] = nums[i] + mapper;
//   }

//   // create bucket
//   const max = Math.max(...nums);
//   const buckets: number[][] = new Array(bucket_number).fill(null).map(() => []);
//   const bucketSize = Math.floor((max - min) / bucket_number);

//   // put elements into buckets
//   for (const item of nums) {
//     const index = Math.floor((item - min) / bucketSize);

//     if (index >= bucket_number) {
//       // handle boundary condition
//       buckets[bucket_number - 1].push(item);
//     } else {
//       buckets[index].push(item);
//     }
//   }

//   // sort for elements in every bucket
//   // and you can use any of the sorting methods
//   for (const bucket of buckets) {
//     bucket.sort((a, b) => a - b);
//   }

//   // Concatenate the sorted buckets in order to create the sorted list.
//   const sortedArray = buckets.flat();

//   // remapping
//   for (let i = 0; i < nums.length; i++) {
//     nums[i] = sortedArray[i] - mapper;
//   }
// }

// // test
// const array = [831, 443, 256, 336, 736, 907, 3, 21323, 54];
// bucketSort(array, 5);
// console.log(array);

// function quickSort(nums: number[]): number[] {
//   // handle boundary
//   if (nums.length <= 1) {
//     return nums;
//   }

//   const pivot: number = Math.floor(nums.length / 2);
//   const left: number[] = [];
//   const right: number[] = [];

//   for (let i = 0; i < nums.length; i++) {
//     if (i === pivot) {
//       continue;
//     } else if (nums[i] < nums[pivot]) {
//       left.push(nums[i]);
//     } else {
//       right.push(nums[i]);
//     }
//   }

//   return [...quickSort(left), nums[pivot], ...quickSort(right)];
// }

// // test
// const array = [2, 0, 2, 1, 1, 0, -3, -4];
// const res = quickSort(array);
// console.log(res);

// function merge(left: number[], right: number[]): number[] {
//   const result: number[] = [];
//   // merge ordered left array and right array together
//   while (left.length > 0 && right.length > 0) {
//     if (left[0] < right[0]) {
//       result.push(left.shift()!);
//     } else {
//       result.push(right.shift()!);
//     }
//   }
//   return result.concat(left, right);
// }

// function mergeSort(nums: number[]): number[] {
//   // handle boundary condition
//   if (nums.length <= 1) {
//     return nums;
//   }

//   // divide array into two parts
//   const middle: number = Math.floor(nums.length / 2);
//   const left: number[] = nums.slice(0, middle);
//   const right: number[] = nums.slice(middle);

//   // recursive
//   return merge(mergeSort(left), mergeSort(right));
// }

// // test
// const res = mergeSort([10, 1, 3, 2, 9, 1, 5, 6]);
// console.log(res);

function heapify(nums: number[], length: number, current_index: number) {
  let largest_index = current_index;
  const left = 2 * current_index + 1;
  const right = 2 * current_index + 2;

  if (left < length && nums[left] > nums[largest_index]) {
    largest_index = left;
  }
  if (right < length && nums[right] > nums[largest_index]) {
    largest_index = right;
  }

  if (largest_index !== current_index) {
    const temp = nums[current_index];
    nums[current_index] = nums[largest_index];
    nums[largest_index] = temp;
    heapify(nums, length, largest_index);
  }
}

function heapSort(nums: number[]) {
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, nums.length, i);
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    const temp = nums[i];
    nums[i] = nums[0];
    nums[0] = temp;
    heapify(nums, i, 0);
  }
}

// test
const array = [2, 0, 2, 1, 1, 0, -3, -4];
heapSort(array);
console.log(array);
