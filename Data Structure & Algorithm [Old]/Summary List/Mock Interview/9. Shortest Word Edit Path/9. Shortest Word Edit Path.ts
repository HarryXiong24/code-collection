// Shortest Word Edit Path

// Given two words source and target, and a list of words words, find the length of the shortest series of edits that transforms source to target.
// Each edit must change exactly one letter at a time, and each intermediate word (and the final target word) must exist in words.
// If the task is impossible, return -1.

// Examples:

// source = "bit", target = "dog"
// words = ["but", "put", "big", "pot", "pog", "dog", "lot"]
// output: 5
// explanation: bit -> but -> put -> pot -> pog -> dog has 5 transitions.

// source = "no", target = "go"
// words = ["to"]
// output: -1

/**
	@param source: string
	@param target: string
	@param words: string[]
	@return: integer
	*/
export function shortestWordEditPath(source: string, target: string, words: string[]): number {
  if (!words.includes(target)) {
    return -1;
  }

  const oneLetterDiff = (word1: string, word2: string): boolean => {
    let diffCount = 0;

    if (word1.length !== word2.length) {
      return false;
    }

    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diffCount++;
      }
      if (diffCount > 1) {
        return false;
      }
    }

    return true;
  };

  const queue: [string, number][] = [[source, 0]];
  const visited = new Set<string>();

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [current, step] = queue.shift()!;

      if (current === target) {
        return step;
      }

      for (const item of words) {
        if (oneLetterDiff(current, item) && !visited.has(item)) {
          queue.push([item, step + 1]);
        }
      }
    }
  }

  return -1;
}

// test
const words = ['but', 'put', 'big', 'pot', 'pog', 'dog', 'lot'];
const res = shortestWordEditPath('bit', 'dog', words);
console.log(res);
