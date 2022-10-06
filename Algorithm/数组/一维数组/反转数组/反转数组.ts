// 反转数组

function reverse(numbers: number[]): number[] {
  let left: number = 0;
  let right: number = numbers.length - 1;
  while (left <= right) {
    const temp = numbers[left];
    numbers[left] = numbers[right];
    numbers[right] = temp;
    left++;
    right--;
  }
  return numbers;
}

// test
const res = reverse([1, 2, 4, 3]);
console.log(res);
