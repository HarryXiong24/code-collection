// 557 反转字符串中的单词 III

/**
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * 示例：
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 */

// 双指针交换，也可以用 reverse 方法
export function reverseWords(s: string): string {
  let arr: string[] = s.split(' ');
  arr = arr.map((value) => {
    let word = value.split('');
    let left: number = 0;
    let right: number = value.length;
    // 双指针
    while (left < right) {
      const temp = word[left];
      word[left] = word[right];
      word[right] = temp;
      left++;
      right--;
    }
    return word.join('');
  });
  return arr.join(' ');
}

// test
const res = reverseWords("Let's take LeetCode contest");
console.log(res);
