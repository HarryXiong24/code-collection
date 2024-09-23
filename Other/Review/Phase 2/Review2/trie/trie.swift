class TrieNode {
    var children: [Character: TrieNode]
    var isEndOfWord: Bool

    init() {
        self.children = [:]
        self.isEndOfWord = false
    }
}

class Trie {
    private var root: TrieNode

    init() {
        self.root = TrieNode()
    }

    func insert(_ word: String) {
        var node = root
        for char in word {
            if node.children[char] == nil {
                node.children[char] = TrieNode()
            }
            node = node.children[char]!
        }
        node.isEndOfWord = true
    }

    func search(_ word: String) -> Bool {
        var node = root
        for char in word {
            if node.children[char] == nil {
                return false
            }
            node = node.children[char]!
        }
        return node.isEndOfWord
    }

    func startsWith(_ prefix: String) -> Bool {
        var node = root
        for char in prefix {
            if node.children[char] == nil {
                return false
            }
            node = node.children[char]!
        }
        return true
    }

    func findLongestCommonPrefix() -> String {
        var prefix = ""
        var node = root
        while node.isEndOfWord == false && node.children.count == 1 {
            if let (char, nextNode) = node.children.first {
                prefix.append(char)
                node = nextNode
            }
        }
        return prefix
    }
}

// test
let trie = Trie()

// insert words
let wordsToInsert = ["apple", "app", "apricot", "banana", "bat", "bath", "cat", "cut"]
for word in wordsToInsert {
    trie.insert(word)
}

// search particular word
print("------")
let searchWords = ["apple", "app", "apex", "bat", "bath", "cut", "cute"]
for word in searchWords {
    print(trie.search(word))
}

// check prefix
print("------")
let prefixesToCheck = ["app", "ba", "bat", "cu", "cy"]
for prefix in prefixesToCheck {
    print(trie.startsWith(prefix))
}

print("------")
print(trie.findLongestCommonPrefix())