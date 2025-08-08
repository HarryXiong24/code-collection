// 269. Alien Dictionary

export function alienOrder(words: string[]): string {
  const graph: Map<string, Set<string>> = new Map();
  const inDegree: Map<string, number> = new Map();

  // init graph
  for (const word of words) {
    for (const char of word) {
      graph.set(char, new Set());
      inDegree.set(char, 0);
    }
  }

  // create graph
  for (let i = 0; i < words.length - 1; i++) {
    const current = words[i];
    const next = words[i + 1];

    // ["abc", "ab"]
    if (current.length > next.length && current.startsWith(next)) {
      return '';
    }

    for (let char = 0; char < Math.min(current.length, next.length); char++) {
      const from = current[char];
      const to = next[char];
      if (from !== to) {
        if (!graph.get(from)!.has(to)) {
          graph.get(from)!.add(to);
          inDegree.set(to, inDegree.get(to)! + 1);
        }
        break;
      }
    }
  }

  // BFS topological sort
  const queue: string[] = [];
  const result: string[] = [];

  // init
  for (const [char, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(char);
    }
  }

  while (queue.length) {
    const current = queue.shift()!;
    result.push(current);

    const neighbors = graph.get(current)!;
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === graph.size ? result.join('') : '';
}

console.log(res);
