// 欧拉路径（Eulerian Path）：在图中找到一条路径，使得每条边都被遍历恰好一次的路径。
// 欧拉回路（Eulerian Circuit）：欧拉路径的特殊情况，即起点和终点是同一个节点的欧拉路径。

// 欧拉图（Eulerian Graph）：存在欧拉回路的图
// 半欧拉图（Semi-Eulerian Graph）：存在欧拉路径但不存在欧拉回路的图
// 非欧拉图（Non-Eulerian Graph）：既不存在欧拉路径也不存在欧拉回路的图

// 无向图
// 欧拉图（存在欧拉回路）的充要条件是 所有节点的度数都是偶数。
// 半欧拉图（存在欧拉路径）的充要条件是 有且仅有两个节点的度数为奇数。

// 有向图
// 欧拉图（存在欧拉回路）的充要条件是 每个节点的入度等于出度。
// 半欧拉图（存在欧拉路径）的充要条件是 有一个节点出度比入度多 1，有一个节点入度比出度多 1，其余节点入度等于出度。

// Hierholzer 算法非常简单，本质就是 DFS 算法的逆后序遍历结果，分为以下几步：
// 1、根据每个节点的度数，确定欧拉路径/欧拉回路的起点。
// 2、从起点开始执行遍历所有边的 DFS 算法，记录后序遍历结果。
// 3、最后，将后序遍历结果反转，即可得到欧拉路径/欧拉回路。对于无向图，由于边没有方向的区别，所以即便不反转，结果也是对的。

enum GraphType {
  Directed = 1,
  Undirected = 2,
}

export function hierholzer(graph: Map<number, number[]>, graphType: GraphType): number[] {
  const postOrder: number[] = [];

  // 找到起点
  const start = findStartNode(graph, graphType);
  if (start === -1) {
    return postOrder;
  }

  const dfs = (node: number) => {
    const neighbors = graph.get(node) ?? [];

    while (neighbors.length) {
      const neighbor = neighbors.pop()!;

      // 无向图需要同步删除反向边（一次性删一个匹配项）
      if (graphType === GraphType.Undirected) {
        const rev = graph.get(neighbor) ?? [];
        const idx = rev.lastIndexOf(node);
        if (idx !== -1) {
          rev.splice(idx, 1);
        }
        graph.set(neighbor, rev);
      }

      dfs(neighbor);
    }

    postOrder.push(node);
  };

  dfs(start);

  return postOrder.reverse();
}

function findStartNode(graph: Map<number, number[]>, graphType: GraphType): number {
  if (graphType === GraphType.Undirected) {
    // 无向图, 出度和入度一致
    // 欧拉图（存在欧拉回路）的充要条件是 所有节点的度数都是偶数。
    // 半欧拉图（存在欧拉路径）的充要条件是 有且仅有两个节点的度数为奇数。

    let oddDegreeCount = 0;
    let startNode = 0;

    for (const item of graph.keys()) {
      if (graph.get(item)!.length % 2 !== 0) {
        oddDegreeCount++;
        startNode = item;
      }
    }

    if (oddDegreeCount != 0 && oddDegreeCount != 2) {
      return -1;
    }

    // 如果奇数度节点的数量是 0，则任意节点都可以作为起点，此时 start=0
    // 如果奇数度节点的数量是 2，任意一个奇数度节点作为起点，此时 start 就是奇数度节点
    return startNode;
  } else {
    // 有向图
    // 欧拉图（存在欧拉回路）的充要条件是 每个节点的入度等于出度。
    // 半欧拉图（存在欧拉路径）的充要条件是 有一个节点出度比入度多 1，有一个节点入度比出度多 1，其余节点入度等于出度。

    const inDegree = new Map<number, number>();
    const outDegree = new Map<number, number>();

    for (const item of graph.keys()) {
      inDegree.set(item, 0);
      outDegree.set(item, 0);
    }

    for (const [item, neighbors] of graph.entries()) {
      outDegree.set(item, outDegree.get(item)! + neighbors.length);
      for (const neighbor of neighbors) {
        inDegree.set(neighbor, inDegree.get(neighbor)! + 1);
      }
    }

    // 如果每个节点的入度出度都相同，则存在欧拉回路，任意节点都可以作为起点
    let isAllSame = true;
    for (const item of graph.keys()) {
      if (inDegree.get(item) !== outDegree.get(item)) {
        isAllSame = false;
        break;
      }
    }
    if (isAllSame) {
      // 任意节点都可以作为起点，就以 0 作为起点
      return 0;
    }

    // 现在寻找是否存在节点 x 和 y 满足：
    // inDegree[x] - outDegree[x] = 1 && inDegree[y] - outDegree[y] = -1
    // 且其他节点的入度和出度都相等
    // 如果存在，则 x 是起点，y 是终点
    let start = -1;
    let end = -1;
    for (const item of graph.keys()) {
      const diff = inDegree.get(item)! - outDegree.get(item)!;

      if (diff === 0) {
        continue;
      }

      if (diff !== 1 && diff !== -1) {
        // 不存在欧拉路径
        return -1;
      }

      if (diff == 1 && end == -1) {
        end = item; // 找到一个“终点”
      } else if (diff == -1 && start == -1) {
        start = item; // 找到一个“起点”
      } else {
        // 不存在欧拉路径
        return -1;
      }

      if (start != -1 && end != -1) {
        // 找到一个起点和一个终点
        return start; // 返回起点
      }
    }

    return -1;
  }
}

// test
const graph = new Map([
  [0, [1, 2, 3]],
  [1, [0, 2]],
  [2, [0, 1]],
  [3, [0]],
]);
const res = hierholzer(graph, GraphType.Undirected);
console.log(res);
