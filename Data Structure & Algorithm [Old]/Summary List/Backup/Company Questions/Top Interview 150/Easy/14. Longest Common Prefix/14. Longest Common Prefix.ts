// 14. Longest Common Prefix

// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

class TrieNode {
  children: Map<string, TrieNode>;
  is_end_of_word: boolean;
  constructor() {
    this.children = new Map();
    this.is_end_of_word = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // O(n)
  insert(word: string) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.is_end_of_word = true;
  }

  // O(n)
  search(word: string): boolean {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.is_end_of_word === true;
  }

  // O(n)
  startsWith(prefix: string) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return true;
  }

  findLongestCommonPrefix() {
    let node = this.root;
    let prefix = '';

    while (!node.is_end_of_word && node.children.size === 1) {
      const [char, nextNode] = [...node.children.entries()][0];
      prefix += char;
      node = nextNode;
    }

    return prefix;
  }
}

export function longestCommonPrefix(strs: string[]): string {
  if (strs.includes('')) {
    return '';
  }

  if (strs.length === 1) {
    return strs[0];
  }

  const trie = new Trie();

  for (const item of strs) {
    trie.insert(item);
  }

  const prefix = trie.findLongestCommonPrefix();

  return prefix;
}

// test
const res = longestCommonPrefix(['flower', 'flow', 'flight']);
console.log(res);
