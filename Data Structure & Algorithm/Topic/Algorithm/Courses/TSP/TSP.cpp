#include "tspdynp.hpp"
#include <iostream> // for debug purposes
#include <limits>   // for UINT_MAX

// Solve TSP exactly, using dynamic programming.
// The grading script will use this exact function signature, so do not change it!
// The graph is given as an adjacency matrix, HOWEVER, no edges have a cost of '0'.
// The value graph[i][j] tells you the cost of an edge from i TO j.  This graph is directed.
// However, if graph[i][j]==0, this means there is no edge from i to j, instead of having one of that cost.
std::vector<unsigned> tsp_dynamic_program(const std::vector<std::vector<long>> &graph, unsigned n)
{
  unsigned N = n;
  unsigned FULL_MASK = (1 << N) - 1;
  const long INF = std::numeric_limits<long>::max() / 2; // 防止溢出

  // dp[mask][u]: 从起点 0 出发，经过状态 mask，最后到达 u 的最小成本
  std::vector<std::vector<long>> dp(1 << N, std::vector<long>(N, INF));
  std::vector<std::vector<int>> parent(1 << N, std::vector<int>(N, -1));

  dp[1][0] = 0; // 起点为0，已访问节点集合为1 << 0

  // 遍历所有可能的状态 mask。比如，mask = 5 (0101) 表示访问了节点 0 和 2。
  for (unsigned mask = 1; mask < (1 << N); mask++)
  {
    if (!(mask & 1))
    {
      // 如果未包含起点 0，跳过。确保每个状态都包含起点 0，因为路径必须从节点 0 开始
      continue;
    }

    // 遍历状态 mask 中所有可能的目标节点 u。u 表示在状态 mask 下最后访问的节点。
    for (unsigned u = 0; u < N; u++)
    {
      if (!(mask & (1 << u)))
      {
        // 检查 u 是否在 mask 中（1 << u 将第 u 位设为 1）
        // 如果 u 不在 mask 中，跳过
        continue;
      }

      // 遍历状态 mask 中的所有可能前驱节点 v
      for (unsigned v = 0; v < N; v++)
      {
        if (v == u)
        {
          // 确保前驱节点和当前节点不同
          continue;
        }

        if (!(mask & (1 << v)))
        {
          // v 必须在 mask 中，表明 v 已被访问，跳过
          continue;
        }

        if (graph[v][u] == 0)
        {
          // 没有从 v 到 u 的边，跳过
          continue;
        }

        unsigned prev_mask = mask ^ (1 << u); // 移除 u 节点，得到 mask 的前一个状态 prev_mask
        if (dp[prev_mask][v] + graph[v][u] < dp[mask][u])
        {
          dp[mask][u] = dp[prev_mask][v] + graph[v][u]; // 递推公式
          parent[mask][u] = v;                          // 记录转移路径的前一个节点 v
        }
      }
    }
  }

  // 找到最小成本的回路
  long min_cost = INF;
  int last = -1;

  // 遍历从 1 到 N-1 的所有节点（不包括起点 0），尝试以每个节点 u 为路径的最后访问节点。
  for (unsigned u = 1; u < N; u++)
  {
    if (graph[u][0] == 0)
    {
      // 没有从 u 返回到 0 的边，跳过
      continue;
    }

    // dp[FULL_MASK][u]: 表示从起点 0 出发，访问所有节点（由 FULL_MASK 表示），最终到达节点 u 的最小成本。
    // graph[u][0]: 表示从节点 u 返回到起点 0 的边的成本。
    // dp[FULL_MASK][u] + graph[u][0]: 表示从起点 0 出发，访问所有节点，最终回到起点 0 的总成本。
    if (dp[FULL_MASK][u] + graph[u][0] < min_cost)
    {
      min_cost = dp[FULL_MASK][u] + graph[u][0];
      last = u;
    }
  }

  if (min_cost >= INF)
  {
    // 没有可能的回路
    return {};
  }

  // 重建路径
  std::vector<unsigned> journey;
  unsigned mask = FULL_MASK;
  int u = last;
  journey.push_back(0); // 起点 0

  std::vector<unsigned> temp_path;
  while (u != -1 && u != 0)
  {
    temp_path.push_back(u);       // 将当前节点 u 添加到 temp_path 中
    int prev_u = parent[mask][u]; // 从 parent[mask][u] 中获取从哪个节点转移到当前节点 u
    mask = mask ^ (1 << u);       // 表示将 u 对应的位清零，表示已经处理过 u
    u = prev_u;                   // 更新当前节点为前驱节点 prev_u，继续回溯
  }

  // 反转路径并添加到 journey
  for (auto it = temp_path.rbegin(); it != temp_path.rend(); ++it)
  {
    journey.push_back(*it);
  }

  // 添加回到起点的节点 0
  journey.push_back(0);

  return journey;
}

// Returns the cost of the journey described here.
long costOfJourney(const std::vector<std::vector<long>> &graph, const std::vector<unsigned> &journey)
{
  long cost = 0;
  for (unsigned long i = 0; i < journey.size() - 1; i++)
  {
    cost += graph[journey[i]][journey[i + 1]];
  }
  cost += graph[journey.back()][journey[0]];
  return cost;
}
