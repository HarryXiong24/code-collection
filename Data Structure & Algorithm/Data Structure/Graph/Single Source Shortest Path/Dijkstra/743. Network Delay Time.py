# 743. Network Delay Time

# You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

# We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

# Example 1:
# Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
# Output: 2

# Example 2:
# Input: times = [[1,2,1]], n = 2, k = 1
# Output: 1

# Example 3:
# Input: times = [[1,2,1]], n = 2, k = 2
# Output: -1

from typing import List


class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = {};
        
        def dfs(signalReceivedAt, curNode, curTime):
            nonlocal adj
            if curTime >= signalReceivedAt[curNode]:
                return
            
            signalReceivedAt[curNode] = curTime
                  
            # Check if curr_node is in the adjacency list before iterating over its neighbors
            if curNode not in adj:
                return 
                   
            for item in adj[curNode]:
                neighborNode, travelTime = item
                dfs(signalReceivedAt, neighborNode, curTime + travelTime)
            
        for i in range(0, len(times)):
            source, dest, travelTime = times[i];
            if source not in adj:
              adj[source] = []
            adj[source].append([dest, travelTime])
            
        for node in adj:
            adj[node].sort(key=lambda x: x[0])
            
        signalReceivedAt = [float('inf')] * (n + 1)
        
        dfs(signalReceivedAt, k, 0);
        
        res = 0
        for i in range(1, n+1):
            if res < signalReceivedAt[i]:
              res = signalReceivedAt[i]
              
        return -1 if res == float('inf') else res

# test
solution = Solution()
res = solution.networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2);
print(res)              
        