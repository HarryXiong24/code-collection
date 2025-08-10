// 557. Reverse Words in a String III

// Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

// Example 1:
// Input: s = "Let's take LeetCode contest"
// Output: "s'teL ekat edoCteeL tsetnoc"

// Example 2:
// Input: s = "God Ding"
// Output: "doG gniD"

// use two point to switch elements, and reverse() can do it too.
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
