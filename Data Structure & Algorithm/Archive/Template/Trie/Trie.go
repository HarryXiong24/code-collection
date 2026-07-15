// Trie

package main

import "fmt"

// TrieNode definition
type TrieNode struct {
	children    map[rune]*TrieNode
	isEndOfWord bool
}

// NewTrieNode creates a new TrieNode
func NewTrieNode() *TrieNode {
	return &TrieNode{
		children:    make(map[rune]*TrieNode),
		isEndOfWord: false,
	}
}

// Trie definition
type Trie struct {
	root *TrieNode
}

// NewTrie creates a new Trie
func NewTrie() *Trie {
	return &Trie{
		root: NewTrieNode(),
	}
}

// Insert inserts a word into the Trie
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

// Search checks if a word is in the Trie
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

// StartsWith checks if there is any word in the Trie that starts with the given prefix
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

// FindLongestCommonPrefix finds the longest common prefix in the Trie
func (t *Trie) FindLongestCommonPrefix() string {
	node := t.root
	prefix := ""
	for !node.isEndOfWord && len(node.children) == 1 {
		for char, nextNode := range node.children {
			prefix += string(char)
			node = nextNode
			break
		}
	}
	return prefix
}

// test
func main() {
	trie := NewTrie() // Initialize

	// Insert words
	wordsToInsert := []string{"apple", "app", "apricot", "banana", "bat", "bath", "cat", "cut"}
	for _, word := range wordsToInsert {
		trie.Insert(word)
	}

	// Search particular words
	searchWords := []string{"apple", "app", "apex", "bat", "bath", "cut", "cute"}
	for _, word := range searchWords {
		fmt.Printf("Word '%s' found in Trie: %v\n", word, trie.Search(word))
	}

	// Check prefix
	prefixesToCheck := []string{"app", "ba", "bat", "cu", "cy"}
	for _, prefix := range prefixesToCheck {
		fmt.Printf("Prefix '%s' found in Trie: %v\n", prefix, trie.StartsWith(prefix))
	}

	// Find the longest common prefix
	fmt.Printf("Longest common prefix: %s\n", trie.FindLongestCommonPrefix())
}