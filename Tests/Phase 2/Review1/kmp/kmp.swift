func KMPSearch(text: String, pattern: String) -> Int {
    if pattern.isEmpty {
        return 0
    }
    
    let textArray = Array(text)
    let patternArray = Array(pattern)
    
    func findLSP(pattern: [Character]) -> [Int] {
        var lsp = [Int](repeating: 0, count: pattern.count)
        var j = 0
        lsp[0] = 0
        
        for i in 1..<pattern.count {
            while j > 0 && pattern[i] != pattern[j] {
                j = lsp[j - 1]
            }
            if pattern[i] == pattern[j] {
                j += 1
                
            } 
            lsp[i] = j
        }
        
        return lsp
    }
    
    let lsp = findLSP(pattern: patternArray)
    var j = 0
    
    for i in 0..<textArray.count {
        while j > 0 && textArray[i] != patternArray[j] {
            j = lsp[j - 1]
        }
        if textArray[i] == patternArray[j] {
            if j == patternArray.count - 1 {
                return i - j
            }
            j += 1
        }
    }
    
    return -1
}

// test
let res = KMPSearch(text: "AABABABABC", pattern: "ABABC")
print(res) // 5