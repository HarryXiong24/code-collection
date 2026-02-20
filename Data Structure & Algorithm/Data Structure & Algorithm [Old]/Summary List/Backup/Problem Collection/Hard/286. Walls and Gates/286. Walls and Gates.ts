// 286. Walls and Gates

// You are given an m x n grid rooms initialized with these three possible values.

// -1 A wall or an obstacle.
// 0 A gate.

// INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

// Example 1:
// Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
// Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

// Example 2:
// Input: rooms = [[-1]]
// Output: [[-1]]

/**
 Do not return anything, modify rooms in-place instead.
 */
export function wallsAndGates(rooms: number[][]): void {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const INF = 2147483647;
  const queue: number[][] = [];
  if (!rooms.length) {
    return;
  }

  const BFS = () => {
    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [current_i, current_j] = queue.shift()!;
        for (const item of directions) {
          const next_i = current_i + item[0];
          const next_j = current_j + item[1];
          if (
            next_i < 0 ||
            next_i >= rooms.length ||
            next_j < 0 ||
            next_j >= rooms[0].length ||
            rooms[next_i][next_j] !== INF
          ) {
            continue;
          }
          rooms[next_i][next_j] = rooms[current_i][current_j] + 1;
          queue.push([next_i, next_j]);
        }
      }
    }
  };

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[0].length; j++) {
      if (rooms[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }

  BFS();
}

// Time exceed
export function wallsAndGates_General(rooms: number[][]): void {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const BFS = (i: number, j: number) => {
    const queue: number[][] = [[i, j]];
    const set = new Set();
    let steps = 0;
    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [current_i, current_j] = queue.shift()!;
        set.add(`row${current_i}-col${current_j}`);
        if (rooms[current_i][current_j] > steps) {
          rooms[current_i][current_j] = steps;
        }
        for (const item of directions) {
          const next_i = current_i + item[0];
          const next_j = current_j + item[1];
          if (
            next_i < 0 ||
            next_i >= rooms.length ||
            next_j < 0 ||
            next_j >= rooms[0].length ||
            rooms[next_i][next_j] === -1 ||
            set.has(`row${next_i}-col${next_j}`)
          ) {
            continue;
          }
          queue.push([next_i, next_j]);
        }
      }
      steps++;
    }
  };

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[0].length; j++) {
      if (rooms[i][j] === 0) {
        BFS(i, j);
      }
    }
  }
}

// test
const rooms = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
];
wallsAndGates(rooms);
console.log(rooms);
