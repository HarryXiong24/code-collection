// 383. Ransom Note

// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

// Example 1:
// Input: ransomNote = "a", magazine = "b"
// Output: false

// Example 2:
// Input: ransomNote = "aa", magazine = "ab"
// Output: false

// Example 3:
// Input: ransomNote = "aa", magazine = "aab"
// Output: true

export function canConstruct(ransomNote: string, magazine: string): boolean {
  const map = new Map<string, number>();

  for (const item of magazine) {
    if (map.has(item)) {
      const temp = map.get(item)!;
      map.set(item, temp + 1);
    } else {
      map.set(item, 1);
    }
  }

  for (const item of ransomNote) {
    if (map.has(item) && map.get(item)! > 0) {
      const temp = map.get(item)!;
      map.set(item, temp - 1);
    } else {
      return false;
    }
  }

  return true;
}

console.log(res);
