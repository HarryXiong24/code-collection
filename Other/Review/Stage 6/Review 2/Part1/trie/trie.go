package main

import "fmt"

type TrieNode struct {
	children    map[rune]*TrieNode
	isEndOfWord bool
}

type Trie struct {
	root *TrieNode
}

func NewTrieNode() *TrieNode {
	return &TrieNode{
		children:    make(map[rune]*TrieNode),
		isEndOfWord: false,
	}
}

func NewTrie() *Trie {
	return &Trie{
		root: NewTrieNode(),
	}
}

func (t *Trie) Insert(word string) {
	node := t.root

	for _, char := range word {
		if _, exists := node.children[char]; !exists {
			node.children[char] = NewTrieNode()
		}
		node = node.children[char]
	}
	node.isEndOfWord = true
}

func (t *Trie) Search(word string) bool {
	node := t.root

	for _, char := range word {
		if _, exists := node.children[char]; !exists {
			return false
		}
		node = node.children[char]
	}

	return node.isEndOfWord
}

func (t *Trie) StartsWith(prefix string) bool {
	node := t.root

	for _, char := range prefix {
		if _, exists := node.children[char]; !exists {
			return false
		}
		node = node.children[char]
	}

	return true
}

func (t *Trie) FindLongestCommonPrefix() string {
	prefix := ""
	node := t.root

	for node.isEndOfWord == false && len(node.children) == 1 {
		for char, next := range node.children {
			// Iterate through the single child
			prefix += string(char)
			node = next
		}
	}

	return prefix
}

// test
func main() {
	// Init Trie
	trie := NewTrie()

	// Insert words
	wordsToInsert := []string{"apple", "app", "apricot", "banana", "bat", "bath", "cat", "cut"}
	for _, word := range wordsToInsert {
		trie.Insert(word)
	}

	// Search for particular words
	fmt.Println("------")
	searchWords := []string{"apple", "app", "apex", "bat", "bath", "cut", "cute"}
	for _, word := range searchWords {
		fmt.Printf("Word '%s' found in Trie: %t\n", word, trie.Search(word))
	}

	// Word 'apple' found in Trie: True
	// Word 'app' found in Trie: True
	// Word 'apex' found in Trie: False
	// Word 'bat' found in Trie: True
	// Word 'bath' found in Trie: True
	// Word 'cut' found in Trie: True
	// Word 'cute' found in Trie: False

	// Check prefix
	fmt.Println("------")
	prefixesToCheck := []string{"app", "ba", "bat", "cu", "cy"}
	for _, prefix := range prefixesToCheck {
		fmt.Printf("Prefix '%s' found in Trie: %t\n", prefix, trie.StartsWith(prefix))
	}

	// Prefix 'app' found in Trie: True
	// Prefix 'ba' found in Trie: True
	// Prefix 'bat' found in Trie: True
	// Prefix 'cu' found in Trie: True
	// Prefix 'cy' found in Trie: False

	// Find longest common prefix
	fmt.Println("------")
	fmt.Printf("Longest common prefix: '%s'\n", trie.FindLongestCommonPrefix())
}
