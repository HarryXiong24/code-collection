// 249. Group Shifted Strings

// We can shift a string by shifting each of its letters to its successive letter.

// For example, "abc" can be shifted to be "bcd".
// We can keep shifting the string to form a sequence.

// For example, we can keep shifting "abc" to form the sequence: "abc" -> "bcd" -> ... -> "xyz".
// Given an array of strings strings, group all strings[i] that belong to the same shifting sequence. You may return the answer in any order.

// Example 1:
// Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
// Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

// Example 2:
// Input: strings = ["a"]
// Output: [["a"]]

export function groupStrings(strings: string[]): string[][] {
  // Function to create a hash value for a string
  const getHash = (string: string): string => {
    // Calculate the number of shifts to make the first character 'a'
    const basic = string.charCodeAt(0);
    const afterShift = string
      .split('')
      .map((letter) => String.fromCharCode(((letter.charCodeAt(0) - basic + 26) % 26) + 'a'.charCodeAt(0)));
    console.log(afterShift);
    return afterShift.join('');
  };

  // Create a hash value (hashKey) for each string and append the string
  // to the list of hash values i.e. mapHashToList["abc"] = ["abc", "bcd"]
  const groups: { [key: string]: string[] } = {};
  for (const string of strings) {
    const hashKey = getHash(string);
    if (!groups[hashKey]) {
      groups[hashKey] = [];
    }
    groups[hashKey].push(string);
  }

  // Return a list of all of the grouped strings
  return Object.values(groups);
}

// test
const res = groupStrings(['abc', 'bcd', 'acef', 'xyz', 'az', 'ba', 'a', 'z']);
console.log(res);
