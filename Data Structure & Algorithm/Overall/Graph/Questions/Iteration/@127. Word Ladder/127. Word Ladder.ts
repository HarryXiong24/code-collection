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
  if (!wordList.includes(endWord)) {
    return 0;
  }

  const nei: Map<string, string[]> = new Map();
  wordList.push(beginWord);

  for (const word of wordList) {
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
      if (!nei.has(pattern)) {
        nei.set(pattern, []);
      }
      nei.get(pattern)!.push(word);
    }
  }

  const visited = new Set<string>();
  const queue: string[] = [];

  queue.push(beginWord);
  visited.add(beginWord);
  let steps = 1;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;

      if (current === endWord) {
        return res;
      }

      for (let j = 0; j < current.length; j++) {
        const pattern = current.slice(0, j) + '*' + current.slice(j + 1);
        const neighbors = nei.get(pattern) || [];

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
    steps++;
  }

  return 0;
}

// test
const res = ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
console.log(res);
