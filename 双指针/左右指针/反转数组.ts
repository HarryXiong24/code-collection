// 反转数组

export function reverse(numbers: number[]): number[] {
  let left: number = 0;
  let right: number = numbers.length - 1;
  while(left <= right) {
    let temp = numbers[left];
    numbers[left] = numbers[right];
    numbers[right] = temp;
    left++;
    right--;
  }
  return numbers;
}

let res = reverse([1, 2, 4, 3]);
console.log(res);

