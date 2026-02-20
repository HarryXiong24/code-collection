// 1002. Find Common Characters

// Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

// Example 1:
// Input: words = ["bella","label","roller"]
// Output: ["e","l","l"]

// Example 2:
// Input: words = ["cool","lock","cook"]
// Output: ["c","o"]

export function commonChars(words: string[]): string[] {
  const wordInitial: [string, number][] = words[0].split('').map((item) => [item, 0]);
  let map = new Map(wordInitial);

  for (let word of words[0]) {
    map.set(word, map.has(word) ? map.get(word)! + 1 : 1);
  }

  for (let i = 1; i < words.length; i++) {
    const mapWord = new Map<string, number>(wordInitial);
    for (let j = 0; j < words[i].length; j++) {
      if (!map.has(words[i][j])) {
        continue;
      } else if (map.get(words[i][j])! > mapWord.get(words[i][j])!) {
        mapWord.set(words[i][j], mapWord.has(words[i][j]) ? mapWord.get(words[i][j])! + 1 : 1);
      }
    }

    map = mapWord;
  }

  let str = '';
  for (let [key, value] of map) {
    str += key.repeat(value);
  }

  return str.split('');
}

// test
const res = commonChars(['bella', 'label', 'roller']);
console.log(res);
