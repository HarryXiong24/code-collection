// 744 寻找比目标字母大的最小字母

/*
 * 给你一个排序后的字符列表 letters ，列表中只包含小写英文字母。另给出一个目标字母 target，请你寻找在这一有序列表里比目标字母大的最小字母。
 * 在比较时，字母是依序循环出现的。举个例子：
 * 如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'
 *
 * 示例 1：
 * 输入: letters = ["c", "f", "j"]，target = "a"
 * 输出: "c"
 *
 * 示例 2:
 * 输入: letters = ["c","f","j"], target = "c"
 * 输出: "f"
 *
 * 示例 3:
 * 输入: letters = ["c","f","j"], target = "d"
 * 输出: "f"
 */

export function nextGreatestLetter(letters: string[], target: string): string {
  const length = letters.length;
  if (target >= letters[length - 1]) {
    return letters[0];
  }
  let low = 0,
    high = length - 1;
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (letters[mid] > target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return letters[low];
}

// test
const res = nextGreatestLetter(['c', 'f', 'j'], 'd');
console.log(res);
