// 1002. Find Common Characters

// Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

// Example 1:
// Input: words = ["bella","label","roller"]
// Output: ["e","l","l"]

// Example 2:
// Input: words = ["cool","lock","cook"]
// Output: ["c","o"]

// like a map filter
export function commonChars(words: string[]): string[] {
  if (!words.length) {
    return [];
  }

  const wordInitial: [string, number][] = words[0].split('').map((item) => [item, 0]);
  let map = new Map(wordInitial);

  for (const item of words[0]) {
    if (!map.has(item)) {
      map.set(item, 0);
    }
    map.set(item, map.get(item)! + 1);
  }

  for (let i = 1; i < words.length; i++) {
    const mapWord = new Map<string, number>(wordInitial);
    for (const item of words[i]) {
      if (!map.has(item)) {
        continue;
      } else if (map.get(item)! > mapWord.get(item)!) {
        mapWord.set(item, mapWord.has(item) ? mapWord.get(item)! + 1 : 1);
      }
    }
    map = mapWord;
  }

  let result: string = '';
  for (const [key, value] of map.entries()) {
    result += key.repeat(value);
  }

  return result.split('');
}

// test
const res = commonChars(['bella', 'label', 'roller']);
console.log(res);
