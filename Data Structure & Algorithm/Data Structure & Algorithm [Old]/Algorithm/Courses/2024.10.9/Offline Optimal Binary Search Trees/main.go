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

import (
	"fmt"
	"math"
)

// 计算从i到j的概率总和
func sum(p []float64, i, j int) float64 {
	total := 0.0
	for k := i; k <= j; k++ {
		total += p[k]
	}
	return total
}

func OptimalBST(p []float64, n int) float64 {
	// cost[i][j] 表示从节点 i 到节点 j 的所有节点构成的子树的最小期望查找成本。
	cost := make([][]float64, n)
	for i := range cost {
		cost[i] = make([]float64, n)
	}

	// the tree only has one node
	for i := 0; i < n; i++ {
		cost[i][i] = p[i]
	}

	// 这段代码的主要目标是使用动态规划算法，计算出不同子树的最小查找成本，并构建一个最优二叉搜索树。为了实现这个目标，我们需要计算每个子树的最优查找成本，并将结果存储在二维数组 cost[i][j] 中。

	// 循环解析

	// 第一层循环：for length := 2; length <= n; length++

	// 这个循环用来遍历子树的长度（即子树包含的节点数量）。我们从 2 开始遍历，因为长度为 1 的子树已经在之前的代码中初始化（单个节点的查找成本就是该节点的概率）。
	// 通过逐渐增加 length，我们先计算两节点的子树，然后是三节点的子树，直到最后包含所有节点的子树。

	// 第二层循环：for i := 0; i <= n-length; i++

	// 在给定的 length 下，这个循环遍历不同的子树起始节点 i。

	// 	•	子树范围：对于起点 i 和长度 length 的子树，子树的结束节点 j 就是 i + length - 1。
	// 	•	例如，如果有 n = 7 个节点，那么当 length = 2 时，我们会遍历 i = 0 到 5。这时，j 取值依次为 1 到 6，表示不同的子树范围。

	// 初始化成本：cost[i][j] = math.Inf(1)

	// 为了找到最小值，我们先将 cost[i][j] 初始化为正无穷大。后面我们会通过遍历每个可能的根节点，逐步更新这个最小值。

	// 计算总概率：totalProb := sum(p, i, j)

	// 因为每个子树中所有节点的概率都会影响树的查找成本，这一步是计算出从节点 i 到节点 j 之间所有节点的概率总和 totalProb。这项总概率会加到当前根节点的查找成本中。

	// 第三层循环：for r := i; r <= j; r++

	// 这个循环尝试将当前子树中从 i 到 j 的每个节点都作为根节点，逐一计算以 r 为根的树的查找成本，并找出使得查找成本最小的节点：

	// 	•	左子树成本：如果 r 大于 i，则存在左子树，左子树的成本是 cost[i][r-1]。否则，左子树成本为 0。
	// 	•	右子树成本：如果 r 小于 j，则存在右子树，右子树的成本是 cost[r+1][j]。否则，右子树成本为 0。

	// 计算总成本并更新 cost[i][j]

	// 	•	总成本：c = leftCost + rightCost + totalProb
	// 	•	leftCost 和 rightCost 是左子树和右子树的最小查找成本；
	// 	•	totalProb 是以 r 为根节点的子树的查找概率。
	// 	•	更新成本：如果 c 小于当前 cost[i][j] 的值，则将 cost[i][j] 更新为 c。最终，这个循环完成后，cost[i][j] 将保存从节点 i 到节点 j 的最小查找成本。

	// 最后，在所有循环结束后，cost[0][n-1] 会包含整个二叉搜索树的最小期望查找成本。这个值表示从节点 0 到节点 n-1 所有节点组成的二叉搜索树的最小期望查找成本。
	for length := 2; length <= n; length++ { // length 为子树的长度
		for i := 0; i <= n-length; i++ {
			j := i + length - 1
			cost[i][j] = math.Inf(1) // 初始化为正无穷大

			// 计算总概率
			totalProb := sum(p, i, j)

			// 尝试每个节点作为根节点并计算最小成本
			for r := i; r <= j; r++ {
				// 左子树和右子树的成本
				leftCost := 0.0
				if r > i {
					leftCost = cost[i][r-1]
				}
				rightCost := 0.0
				if r < j {
					rightCost = cost[r+1][j]
				}

				// 总成本：左右子树成本加上根节点的查找概率
				c := leftCost + rightCost + totalProb
				if c < cost[i][j] {
					cost[i][j] = c
				}
			}
		}
	}

	return cost[0][n-1]
}

func main() {
	probabilities := []float64{0.13, 0.21, 0.11, 0.01, 0.22, 0.08, 0.24}
	n := len(probabilities)

	minCost := OptimalBST(probabilities, n)
	fmt.Println(minCost)
}
