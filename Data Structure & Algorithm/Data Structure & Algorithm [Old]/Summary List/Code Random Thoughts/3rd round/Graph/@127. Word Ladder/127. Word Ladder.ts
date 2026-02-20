// 127. Word Ladder

// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

// Example 1:
// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5
// Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

// Example 2:
// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
// Output: 0
// Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const set = new Set(wordList);
  const map: Map<string, number> = new Map();

  const queue: string[] = [beginWord];
  map.set(beginWord, 1);

  while (queue.length) {
    const current = queue.shift()!;

    for (let i = 0; i < current.length; i++) {
      const newWord = current.split('');

      for (let j = 0; j < 26; j++) {
        newWord[i] = String.fromCharCode('a'.charCodeAt(0) + j);
        const nextWord = newWord.join('');

        if (set.has(nextWord) && nextWord === endWord) {
          return map.get(current)! + 1;
        }

        if (set.has(nextWord) && !map.has(nextWord)) {
          queue.push(nextWord);
          map.set(nextWord, map.get(current)! + 1);
        }
      }
    }
  }

  return 0;
}

// test
const res = ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
console.log(res);
