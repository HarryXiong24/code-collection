class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

    def findLongestCommonPrefix(self):
        prefix = ""
        node = self.root

        while len(node.children) == 1 and not node.is_end_of_word:
            char, nextNode = next(iter(node.children.items()))
            prefix += char
            node = nextNode
        return prefix


# test
trie = Trie()  # init

# insert words
words_to_insert = ["apple", "app", "apricot", "banana", "bat", "bath", "cat", "cut"]
for word in words_to_insert:
    trie.insert(word)

# search particular word
search_words = ["apple", "app", "apex", "bat", "bath", "cut", "cute"]
for word in search_words:
    print(f"Word '{word}' found in Trie: {trie.search(word)}")

# Word 'apple' found in Trie: True
# Word 'app' found in Trie: True
# Word 'apex' found in Trie: False
# Word 'bat' found in Trie: True
# Word 'bath' found in Trie: True
# Word 'cut' found in Trie: True
# Word 'cute' found in Trie: False

# check prefix
print("------")
prefixes_to_check = ["app", "ba", "bat", "cu", "cy"]
for prefix in prefixes_to_check:
    print(f"Prefix '{prefix}' found in Trie: {trie.startsWith(prefix)}")

# Prefix 'app' found in Trie: True
# Prefix 'ba' found in Trie: True
# Prefix 'bat' found in Trie: True
# Prefix 'cu' found in Trie: True
# Prefix 'cy' found in Trie: False

print("------")
print(trie.findLongestCommonPrefix())
