// 205. Isomorphic Strings

// Given two strings s and t, determine if they are isomorphic.

// Two strings s and t are isomorphic if the characters in s can be replaced to get t.

// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

// Example 1:
// Input: s = "egg", t = "add"
// Output: true

// Example 2:
// Input: s = "foo", t = "bar"
// Output: false

// Example 3:
// Input: s = "paper", t = "title"
// Output: true

class Solution {
    func isIsomorphic(_ s: String, _ t: String) -> Bool {
        var map1: [Character : Character] = [:]
        var map2: [Character : Character] = [:]
        
        if s.count != t.count {
            return false
        }
        
        // Convert strings to character arrays
        let sArray: [String.Element] = Array(s)
        let tArray: [String.Element] = Array(t)
        
        // Iterate over the characters with indices
        for i in 0..<s.count {
            let charS: String.Element = sArray[i]
            let charT: String.Element = tArray[i]
            
            // Check if mapping exists in both directions
            if let mappedT: Character = map1[charS], mappedT != charT {
                return false
            }
            
            if let mappedS: Character = map2[charT], mappedS != charS {
                return false
            }
            
            // Establish mapping in both directions
            map1[charS] = charT
            map2[charT] = charS
        }
        
        return true
    }
}

// test
let solution = Solution()
let res = solution.isIsomorphic("egg", "add");
print(res);
