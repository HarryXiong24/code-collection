// In your undergraduate data structures class, you saw unbalanced binary search trees. These had O(log n) lookup time under some conditions, but O(n) lookup time in the worst case. You then saw balanced binary search trees: there are structures such as AVL, Red/Black, WAVL, and Crumple Trees that make the “promise” that any given lookup in the tree would take O(log n) time. We can’t reasonably expect a better worst case, and these are great data structures for the case when elements can be added to the tree arbitrarily and we don’t know how often (or even if) we will look up any given element.

// Suppose that before building a binary search tree, we knew exactly which elements were going to be in the tree. If we’re likely to look up any given one with equal probability, or if we don’t know the likelihood of looking up any given element, we can balance the tree by placing the median element at the root and recursively building trees in this fashion for the left- and right-subtrees. But what if we also knew the probability that we’d look up any given element once the tree was built? This might not produce an optimal binary search tree in terms of the expected value of the lookup.

// Suppose we have n keys, k1 . . . kn, with probabilities p1 . . . pn that we will look up the given elements; each probability pi is positive, and the sum of these is 1.

// Here’s an example with n = 7 keys:
// i 1 2 3 4 5 6 7
// pi
// .13 .21 .11 .01 .22 .08 .24

// This tree is balanced This one is less balanced What is the expected lookup cost (in terms of nodes examined) for each of these trees?

// Problem Statement: We are given n probabilities, p1 . . . pn; pi represents the probability of looking up the ith smallest key once the tree is built. Our goal is to build a binary search tree with the smallest expected lookup cost.

// Note that our output must be a binary search tree; we cannot reorder the elements.

// Check for understanding: we have computed di, the depth within the tree of each node. The root has di = 1, its children have di = 2, and so on. What is the expected lookup cost of this tree?

package main

func OptimalBinarySearchTree() {

}

// test
func main() {

}
