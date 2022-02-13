// DFS（深度优先搜索） 与 BFS（广度优先搜索）

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// DFS
function dfs(root: TreeNode | null) {
  if (root === null) {
    return;
  }
  dfs(root.left);
  dfs(root.right);
}

// BFS
function bfs(root: TreeNode | null) {
  if (root === null) {
    return;
  }
  const q: TreeNode[] = [root];
  while (q.length !== 0) {
    const node = q.pop() as TreeNode;
    if (node.left) {
      q.push(node.left);
    }
    if (node.right) {
      q.push(node.right);
    }
  }
}
