// 841. Keys and Rooms

// There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

// When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

// Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

// Example 1:
// Input: rooms = [[1],[2],[3],[]]
// Output: true
// Explanation:
// We visit room 0 and pick up key 1.
// We then visit room 1 and pick up key 2.
// We then visit room 2 and pick up key 3.
// We then visit room 3.
// Since we were able to visit every room, we return true.

// Example 2:
// Input: rooms = [[1,3],[3,0,1],[2],[0]]
// Output: false
// Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.

export function canVisitAllRooms(rooms: number[][]): boolean {
  const stack: number[] = [];
  const seen_room: boolean[] = new Array(rooms.length).fill(false);
  // the first room is unlocked.
  seen_room[0] = true;
  stack.push(0);

  while (stack.length > 0) {
    const store = stack.pop()!;
    const enter = rooms[store];
    for (const key of enter) {
      if (seen_room[key] === false) {
        stack.push(key);
        seen_room[key] = true;
      }
    }
  }

  return seen_room.includes(false) ? false : true;
}

// test
const res = canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]);
console.log(res);
