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

  search(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.is_end_of_word;
  }

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

  findLongestPrefix() {
    let prefix = '';
    let node = this.root;

    while (!node.is_end_of_word && node.children.size === 1) {
      const [current_char, current_child] = [...node.children.entries()][0];
      prefix += current_char;
      node = current_child;
    }

    return prefix;
  }
}

// test
const trie = new Trie(); // init

// insert words
const words_to_insert = ['apple', 'app', 'apricot', 'banana', 'bat', 'bath', 'cat', 'cut'];
for (const word of words_to_insert) {
  trie.insert(word);
}

// search particular word
console.log('------');
const search_words = ['apple', 'app', 'apex', 'bat', 'bath', 'cut', 'cute'];
for (const word of search_words) {
  console.log(trie.search(word));
}

// Word 'apple' found in Trie: True
// Word 'app' found in Trie: True
// Word 'apex' found in Trie: False
// Word 'bat' found in Trie: True
// Word 'bath' found in Trie: True
// Word 'cut' found in Trie: True
// Word 'cute' found in Trie: False

// check prefix
console.log('------');
const prefixes_to_check = ['app', 'ba', 'bat', 'cu', 'cy'];
for (const prefix of prefixes_to_check) {
  console.log(trie.startsWith(prefix));
}

// Prefix 'app' found in Trie: True
// Prefix 'ba' found in Trie: True
// Prefix 'bat' found in Trie: True
// Prefix 'cu' found in Trie: True
// Prefix 'cy' found in Trie: False
